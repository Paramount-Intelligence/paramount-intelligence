"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  RoomAudioRenderer,
  VideoTrack,
  useConnectionState,
  useParticipants,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, RoomEvent, Track } from "livekit-client";

interface AvatarSupportChatProps {
  roomName: string;
  onDisconnect?: () => void;
  onMinimize?: () => void;
}

interface TranscriptEntry {
  id: string;
  role: "user" | "agent";
  text: string;
  createdAt: number;
}

const SESSION_DURATION_SECONDS = 120;
const SESSION_GRACE_SECONDS = 10;

function formatCountdown(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function MicWaveIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="9"
        y="2"
        width="6"
        height="13"
        rx="3"
        fill={active ? "#22c55e" : "#475569"}
      />
      <path
        d="M5 11a7 7 0 0 0 14 0"
        stroke={active ? "#22c55e" : "#475569"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="18"
        x2="12"
        y2="22"
        stroke={active ? "#22c55e" : "#475569"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AvatarSupportChat({
  roomName,
  onDisconnect,
  onMinimize,
}: AvatarSupportChatProps) {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  const participants = useParticipants();
  const cameraTracks = useTracks([Track.Source.Camera]);

  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(
    SESSION_DURATION_SECONDS,
  );
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [micUpdating, setMicUpdating] = useState(false);
  const [avatarTrackLost, setAvatarTrackLost] = useState(false);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const hasEndedRef = useRef(false);
  const sessionStartedAtRef = useRef<number>(Date.now());

  const localIdentity = room.localParticipant.identity;
  void roomName;

  const remoteParticipants = useMemo(
    () => participants.filter((p) => p.identity !== localIdentity),
    [participants, localIdentity],
  );

  const agentParticipant = useMemo(() => {
    const likelyAgent = remoteParticipants.find((p) => {
      const value = `${p.identity} ${p.name || ""}`.toLowerCase();
      const publishOnBehalf = p.attributes?.["lk.publish_on_behalf"];

      return (
        Boolean(publishOnBehalf) ||
        value.includes("agent") ||
        value.includes("avatar") ||
        value.includes("simli") ||
        value.includes("assistant")
      );
    });

    return likelyAgent || remoteParticipants[0];
  }, [remoteParticipants]);

  const remoteVideoTrack = useMemo(() => {
    const remoteCameraTracks = cameraTracks.filter(
      (trackRef) => trackRef.participant.identity !== localIdentity,
    );

    if (!agentParticipant) return remoteCameraTracks[0];

    return (
      remoteCameraTracks.find(
        (trackRef) =>
          trackRef.participant.identity === agentParticipant.identity,
      ) || remoteCameraTracks[0]
    );
  }, [cameraTracks, localIdentity, agentParticipant]);

  const isConnected = connectionState === ConnectionState.Connected;

  const endSession = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    room.disconnect();
    onDisconnect?.();
  }, [room, onDisconnect]);

  const toggleMicrophone = useCallback(async () => {
    if (micUpdating) return;

    const nextEnabled = !micActive;
    setMicUpdating(true);

    try {
      await room.localParticipant.setMicrophoneEnabled(nextEnabled, {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      });
      setMicActive(nextEnabled);
    } catch (err) {
      console.warn("[AvatarSupportChat] Failed to toggle microphone:", err);
    } finally {
      setMicUpdating(false);
    }
  }, [room, micActive, micUpdating]);

  useEffect(() => {
    sessionStartedAtRef.current = Date.now();

    const timer = window.setInterval(() => {
      if (hasEndedRef.current) return;

      const elapsedSeconds = Math.floor(
        (Date.now() - sessionStartedAtRef.current) / 1000,
      );
      const secondsLeft = Math.max(
        0,
        SESSION_DURATION_SECONDS - elapsedSeconds,
      );

      setSessionSecondsLeft(secondsLeft);

      if (elapsedSeconds >= SESSION_DURATION_SECONDS + SESSION_GRACE_SECONDS) {
        endSession();
      }
    }, 500);

    return () => window.clearInterval(timer);
  }, [endSession]);

  useEffect(() => {
    if (!agentParticipant) return;

    const onSpeakingChanged = () =>
      setAgentSpeaking(agentParticipant.isSpeaking);
    agentParticipant.on("isSpeakingChanged", onSpeakingChanged);
    onSpeakingChanged();

    return () => {
      agentParticipant.off("isSpeakingChanged", onSpeakingChanged);
    };
  }, [agentParticipant]);

  useEffect(() => {
    setAvatarTrackLost(
      isConnected && Boolean(agentParticipant) && !remoteVideoTrack,
    );
  }, [isConnected, agentParticipant, remoteVideoTrack]);

  useEffect(() => {
    function syncMicState() {
      const micPublication = Array.from(
        room.localParticipant.trackPublications.values(),
      ).find((publication) => publication.source === Track.Source.Microphone);

      if (micPublication) {
        setMicActive(!micPublication.isMuted);
      }
    }

    syncMicState();
    room.on(RoomEvent.LocalTrackPublished, syncMicState);
    room.on(RoomEvent.LocalTrackUnpublished, syncMicState);
    room.on(RoomEvent.TrackMuted, syncMicState);
    room.on(RoomEvent.TrackUnmuted, syncMicState);

    return () => {
      room.off(RoomEvent.LocalTrackPublished, syncMicState);
      room.off(RoomEvent.LocalTrackUnpublished, syncMicState);
      room.off(RoomEvent.TrackMuted, syncMicState);
      room.off(RoomEvent.TrackUnmuted, syncMicState);
    };
  }, [room]);

  useEffect(() => {
    function handleTranscription(segments: any[], participant?: any) {
      const finalSegments = segments.filter(
        (segment) =>
          segment &&
          typeof segment.text === "string" &&
          segment.text.trim().length > 0 &&
          segment.final !== false,
      );

      if (!finalSegments.length) return;

      const isAgent =
        participant?.identity && participant.identity !== localIdentity;

      setTranscript((prev) => {
        const existingIds = new Set(prev.map((entry) => entry.id));
        const next = [...prev];

        for (const segment of finalSegments) {
          const id =
            segment.id ||
            `${participant?.identity || "u"}-${Date.now()}-${Math.random()}`;

          if (existingIds.has(id)) continue;

          next.push({
            id,
            role: isAgent ? "agent" : "user",
            text: segment.text,
            createdAt: Date.now(),
          });
          existingIds.add(id);
        }

        return next;
      });
    }

    function handleDataReceived(payload: Uint8Array, participant?: any) {
      try {
        const msg = JSON.parse(new TextDecoder().decode(payload));
        if (msg.type !== "transcript" || !msg.text) return;

        const isAgent =
          participant?.identity && participant.identity !== localIdentity;

        setTranscript((prev) => [
          ...prev,
          {
            id: `${participant?.identity || "data"}-${Date.now()}-${Math.random()}`,
            role: isAgent ? "agent" : "user",
            text: msg.text,
            createdAt: Date.now(),
          },
        ]);
      } catch {
        return;
      }
    }

    room.on(RoomEvent.TranscriptionReceived, handleTranscription as any);
    room.on(RoomEvent.DataReceived, handleDataReceived as any);

    return () => {
      room.off(RoomEvent.TranscriptionReceived, handleTranscription as any);
      room.off(RoomEvent.DataReceived, handleDataReceived as any);
    };
  }, [room, localIdentity]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const urgency = sessionSecondsLeft <= 30;
  const critical = sessionSecondsLeft <= 10;

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden text-[#f8fafc]"
      style={{
        background:
          "linear-gradient(160deg, #07101f 0%, #0c1829 50%, #0a1525 100%)",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        borderRadius: "inherit",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,800&family=JetBrains+Mono:wght@400;600&display=swap');

        .assistant-main-grid { grid-template-columns: minmax(0, 1fr) minmax(320px, 380px); }

        @media (max-width: 900px) {
          .assistant-main-grid { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) 320px; }
          .assistant-transcript-panel { border-left: 0 !important; border-top: 1px solid rgba(255,255,255,0.06); }
          .assistant-header { padding-left: 16px !important; padding-right: 16px !important; }
          .assistant-end-label { display: none; }
        }

        .transcript-scroll::-webkit-scrollbar { width: 4px; }
        .transcript-scroll::-webkit-scrollbar-track { background: transparent; }
        .transcript-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.15); border-radius: 4px; }
        .transcript-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.3); }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }

        @keyframes speaking-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34,197,94,0.3), 0 0 60px rgba(34,197,94,0.1); }
          50% { box-shadow: 0 0 30px rgba(34,197,94,0.5), 0 0 80px rgba(34,197,94,0.2); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bar-bounce {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .speaking-bar { animation: bar-bounce 0.6s ease-in-out infinite; transform-origin: bottom; }
        .bar-1 { animation-delay: 0s; }
        .bar-2 { animation-delay: 0.1s; }
        .bar-3 { animation-delay: 0.2s; }
        .bar-4 { animation-delay: 0.15s; }
        .bar-5 { animation-delay: 0.05s; }
        .transcript-entry { animation: fade-in-up 0.25s ease forwards; }
        .timer-critical { animation: pulse-ring 1s ease-in-out infinite; }
        .avatar-speaking { animation: speaking-glow 1.5s ease-in-out infinite; }
      `}</style>

      <RoomAudioRenderer />

      <header
        className="assistant-header flex flex-none items-center justify-between gap-4 px-6 py-4"
        style={{
          background: "rgba(7,16,31,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex-none">
            <span
              className={`block h-2.5 w-2.5 rounded-full ${isConnected ? "bg-emerald-400" : "bg-slate-500"}`}
              style={
                isConnected ? { boxShadow: "0 0 8px rgba(52,211,153,0.8)" } : {}
              }
            />
            {isConnected && (
              <span
                className="absolute inset-0 rounded-full bg-emerald-400 opacity-30"
                style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
              />
            )}
          </div>

          <div className="min-w-0">
            <h2
              className="truncate text-base font-bold tracking-tight text-white"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              Paramount Intelligence
            </h2>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-slate-400">
              {isConnected
                ? avatarTrackLost
                  ? "Avatar reconnecting"
                  : "Session active"
                : "Connecting…"}
            </p>
          </div>
        </div>

        <div className="flex flex-none items-center gap-2">
          <div
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold transition-all ${
              critical
                ? "border border-red-500/30 bg-red-500/20 text-red-300 timer-critical"
                : urgency
                  ? "border border-amber-500/25 bg-amber-500/15 text-amber-300"
                  : "border border-white/8 bg-white/5 text-slate-300"
            }`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              minWidth: "62px",
              textAlign: "center",
            }}
          >
            {formatCountdown(sessionSecondsLeft)}
          </div>

          {onMinimize && (
            <button
              onClick={onMinimize}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              aria-label="Minimize"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line
                  x1="2"
                  y1="7"
                  x2="12"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}

          <button
            onClick={endSession}
            className="flex h-9 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              boxShadow: "0 4px 14px rgba(220,38,38,0.35)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2L10 10M10 2L2 10"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="assistant-end-label">End</span>
          </button>
        </div>
      </header>

      <main className="assistant-main-grid grid min-h-0 flex-1">
        <section
          className="relative flex min-h-0 flex-col overflow-hidden"
          style={{ background: "#050d1a" }}
        >
          {remoteVideoTrack ? (
            <div
              className={`relative h-full w-full overflow-hidden ${agentSpeaking ? "avatar-speaking" : ""}`}
              style={{
                background: "linear-gradient(180deg, #060f1e 0%, #0a1525 100%)",
              }}
            >
              <VideoTrack
                trackRef={remoteVideoTrack}
                className="!block !h-full !w-full !max-w-none !object-cover !object-center"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(5,13,26,0.5) 100%)",
                }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,13,26,0.85) 0%, transparent 100%)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-5 items-end gap-[3px]">
                    {agentSpeaking ? (
                      [1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`speaking-bar bar-${i} w-[3px] rounded-full bg-emerald-400`}
                          style={{ height: "100%" }}
                        />
                      ))
                    ) : (
                      <div className="h-[2px] w-12 rounded-full bg-slate-600" />
                    )}
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-300"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {agentSpeaking ? "Speaking" : "AI Consultant"}
                  </span>
                </div>

                <button
                  onClick={toggleMicrophone}
                  disabled={micUpdating}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background: micActive
                      ? "rgba(34,197,94,0.12)"
                      : "rgba(255,255,255,0.06)",
                    border: `1px solid ${micActive ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`,
                    color: micActive ? "#86efac" : "#94a3b8",
                  }}
                >
                  <MicWaveIcon active={micActive} />
                  {micUpdating ? "Updating" : micActive ? "Mic on" : "Muted"}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="grid h-full w-full place-items-center"
              style={{ background: "#050d1a" }}
            >
              <div className="flex flex-col items-center gap-4 px-6 text-center">
                <div
                  className="relative h-28 w-28 overflow-hidden rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(99,102,241,0.15))",
                    border: "2px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                      animation: "shimmer 1.5s ease-in-out infinite",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                      fill="none"
                      opacity="0.3"
                    >
                      <circle cx="26" cy="18" r="10" fill="#94a3b8" />
                      <path
                        d="M6 48c0-11 9-18 20-18s20 7 20 18"
                        fill="#94a3b8"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded-full border-[1.5px] border-blue-400/20 border-t-blue-400"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    <span className="text-sm font-medium text-slate-400">
                      {avatarTrackLost
                        ? "Restoring avatar stream…"
                        : "Connecting avatar…"}
                    </span>
                  </div>
                  <p className="max-w-[320px] text-xs leading-relaxed text-slate-600">
                    The voice room is active. Waiting for the Simli video track
                    to publish.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside
          className="assistant-transcript-panel flex min-h-0 flex-col"
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(7,16,31,0.6)",
          }}
        >
          <div
            className="flex flex-none items-center justify-between gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400">
                Live Transcript
              </p>
              <h3 className="text-base font-bold tracking-tight text-white">
                Conversation
              </h3>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Live
              </span>
            </div>
          </div>

          <div
            ref={transcriptRef}
            className="transcript-scroll min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {transcript.length === 0 ? (
              <div className="space-y-2 pt-2">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Try asking
                </p>
                {[
                  "What does Paramount Intelligence do?",
                  "What AI services do you offer?",
                  "Do you build voice AI agents?",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="cursor-default select-none rounded-xl px-4 py-3 text-sm leading-relaxed text-slate-300"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {q}
                  </div>
                ))}
              </div>
            ) : (
              transcript.map((entry) => (
                <div
                  key={entry.id}
                  className={`transcript-entry flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {entry.role === "agent" && (
                    <div
                      className="mr-2 mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold uppercase text-blue-300"
                      style={{
                        background: "rgba(37,99,235,0.2)",
                        border: "1px solid rgba(37,99,235,0.25)",
                      }}
                    >
                      AI
                    </div>
                  )}
                  <div
                    className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      entry.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, #1d4ed8, #2563eb)",
                            color: "#f0f7ff",
                            borderBottomRightRadius: "6px",
                            boxShadow: "0 2px 12px rgba(37,99,235,0.25)",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#e2e8f0",
                            borderBottomLeftRadius: "6px",
                          }
                    }
                  >
                    {entry.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="flex-none px-4 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <MicWaveIcon active={isConnected && micActive} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  Voice Mode
                </p>
                <p className="mt-0.5 text-xs leading-snug text-slate-400">
                  {micActive
                    ? "Mic is active only during this session"
                    : "Mic is muted. Click Mic off to speak again"}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
