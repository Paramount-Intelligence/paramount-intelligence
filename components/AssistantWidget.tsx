"use client";

import { useRef, useState, useEffect } from "react";
import { LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import AvatarSupportChat from "@/components/AvatarSupportChat";

interface SessionInfo {
  token: string;
  serverUrl: string;
  roomName: string;
  identity: string;
}

type WidgetState = "closed" | "preview" | "active";
type PrefetchStatus = "idle" | "loading" | "ready" | "error";
type MicWarmupStatus = "idle" | "requesting" | "ready" | "blocked";

interface AssistantConnectingScreenProps {
  error: string;
  loading: boolean;
  onRetry: () => void;
  onClose: () => void;
}

const SESSION_PREFETCH_MAX_AGE_MS = 45_000;

const LIVEKIT_CONNECT_OPTIONS = {
  autoSubscribe: true,
  maxRetries: 1,
  peerConnectionTimeout: 8_000,
  websocketTimeout: 8_000,
};

function AssistantConnectingScreen({
  error,
  loading,
  onRetry,
  onClose,
}: AssistantConnectingScreenProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, #07101f 0%, #0c1829 50%, #0a1525 100%)",
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');`}</style>
      <section
        className="relative h-full w-full overflow-hidden text-white"
        style={{ borderRadius: "inherit" }}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:text-white"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 2L10 10M10 2L2 10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {error ? (
          <div className="flex h-full w-full items-center justify-center p-6">
            <div
              className="w-full max-w-[420px] rounded-2xl p-7 text-center"
              style={{
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(248,113,113,0.2)",
              }}
            >
              <div
                className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl text-2xl font-bold text-red-300"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(248,113,113,0.2)",
                }}
              >
                !
              </div>
              <h2 className="text-xl font-bold text-white">
                Connection failed
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{error}</p>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  }}
                  onClick={onRetry}
                  disabled={loading}
                >
                  {loading ? "Retrying…" : "Try Again"}
                </button>
                <button
                  className="w-full rounded-xl border py-3 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    background: "transparent",
                  }}
                  onClick={onClose}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <div className="relative">
              <div
                className="h-24 w-24 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(99,102,241,0.1))",
                  border: "1.5px solid rgba(37,99,235,0.25)",
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    opacity="0.4"
                  >
                    <circle cx="20" cy="13" r="8" fill="#93c5fd" />
                    <path
                      d="M4 38c0-8.8 7.2-14 16-14s16 5.2 16 14"
                      fill="#93c5fd"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="absolute -inset-2 rounded-full border-[1.5px] border-transparent"
                style={{
                  borderTopColor: "#3b82f6",
                  borderRightColor: "rgba(59,130,246,0.3)",
                  animation: "spin 1.2s linear infinite",
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-white">
                Connecting your session
              </p>
              <p className="mt-1.5 text-sm text-slate-500">
                Setting up voice, avatar, and microphone…
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400"
                  style={{
                    animation: "pulse-dot 1.2s ease-in-out infinite",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </div>
  );
}

const SUGGESTED_PROMPTS = [
  { icon: "◈", label: "What does Paramount Intelligence do?" },
  { icon: "⬡", label: "What AI services do you offer?" },
  { icon: "◉", label: "Do you build voice AI agents?" },
];

export default function AssistantWidget() {
  const [widgetState, setWidgetState] = useState<WidgetState>("closed");
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prefetchStatus, setPrefetchStatus] = useState<PrefetchStatus>("idle");
  const [micWarmupStatus, setMicWarmupStatus] =
    useState<MicWarmupStatus>("idle");

  const isStartingRef = useRef(false);
  const prefetchedSessionRef = useRef<SessionInfo | null>(null);
  const prefetchPromiseRef = useRef<Promise<SessionInfo | null> | null>(null);
  const prefetchStartedAtRef = useRef<number>(0);

  const prewarmedMicStreamRef = useRef<MediaStream | null>(null);
  const micWarmupPromiseRef = useRef<Promise<boolean> | null>(null);

  async function requestSession(): Promise<SessionInfo> {
    const response = await fetch("/api/token", {
      method: "GET",
      cache: "no-store",
    });

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(data?.error || "Failed to create LiveKit session");
    }

    if (!data?.token || !data?.serverUrl || !data?.roomName) {
      throw new Error("LiveKit session response is missing required fields");
    }

    return data;
  }

  function releasePrewarmedMicrophone() {
    if (!prewarmedMicStreamRef.current) return;
    for (const track of prewarmedMicStreamRef.current.getTracks()) {
      track.stop();
    }
    prewarmedMicStreamRef.current = null;
  }

  async function prewarmMicrophone(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const mediaDevices = navigator?.mediaDevices;
    if (!mediaDevices?.getUserMedia) {
      setMicWarmupStatus("blocked");
      return false;
    }

    if (prewarmedMicStreamRef.current) {
      setMicWarmupStatus("ready");
      return true;
    }

    if (micWarmupPromiseRef.current) return micWarmupPromiseRef.current;

    setMicWarmupStatus("requesting");

    micWarmupPromiseRef.current = mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      })
      .then((stream) => {
        prewarmedMicStreamRef.current = stream;
        setMicWarmupStatus("ready");
        return true;
      })
      .catch((err) => {
        console.warn("[AssistantWidget] Mic warmup failed:", err?.message);
        setMicWarmupStatus("blocked");
        return false;
      })
      .finally(() => {
        micWarmupPromiseRef.current = null;
      });

    return micWarmupPromiseRef.current;
  }

  function hasFreshPrefetchedSession() {
    if (!prefetchedSessionRef.current) return false;
    return (
      Date.now() - prefetchStartedAtRef.current < SESSION_PREFETCH_MAX_AGE_MS
    );
  }

  async function prefetchSession() {
    if (session || hasFreshPrefetchedSession() || prefetchPromiseRef.current) {
      return;
    }

    setPrefetchStatus("loading");
    prefetchStartedAtRef.current = Date.now();
    console.log("[AssistantWidget] Prefetching LiveKit token…");

    prefetchPromiseRef.current = requestSession()
      .then((data) => {
        prefetchedSessionRef.current = data;
        setPrefetchStatus("ready");
        console.log("[AssistantWidget] Token ready");
        return data;
      })
      .catch((err) => {
        console.warn("[AssistantWidget] Prefetch failed:", err?.message);
        prefetchedSessionRef.current = null;
        setPrefetchStatus("error");
        return null;
      })
      .finally(() => {
        prefetchPromiseRef.current = null;
      });

    await prefetchPromiseRef.current;
  }

  function openPreview() {
    setWidgetState("preview");
    setError("");

    // These are intentionally started during the user's first click.
    // Token fetch and mic permission then happen while the preview card is visible,
    // not after the user clicks Start Voice Session.
    void prefetchSession();
    void prewarmMicrophone();
  }

  useEffect(() => {
    if (widgetState === "preview") {
      void prefetchSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetState]);

  useEffect(() => {
    return () => {
      releasePrewarmedMicrophone();
    };
  }, []);

  async function startSession() {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    setWidgetState("active");
    setSession(null);
    setLoading(true);
    setError("");

    try {
      let nextSession = hasFreshPrefetchedSession()
        ? prefetchedSessionRef.current
        : null;

      if (!nextSession && prefetchPromiseRef.current) {
        console.log("[AssistantWidget] Awaiting in-flight prefetch…");
        nextSession = await prefetchPromiseRef.current;
      }

      // Keep microphone permission warm in parallel. This removes the permission
      // prompt from the critical LiveKit connect path whenever the browser allows it.
      const micWarmup = prewarmMicrophone();

      if (!nextSession) {
        console.log("[AssistantWidget] No fresh prefetch — fetching token now");
        nextSession = await requestSession();
      } else {
        console.log("[AssistantWidget] Using prefetched token");
      }

      await micWarmup.catch(() => false);

      prefetchedSessionRef.current = null;
      prefetchPromiseRef.current = null;
      setPrefetchStatus("idle");

      // Release the warmup stream before LiveKit publishes the real mic track.
      releasePrewarmedMicrophone();

      setSession(nextSession);
    } catch (err) {
      releasePrewarmedMicrophone();
      setError(
        err instanceof Error
          ? err.message
          : "Failed to start assistant session",
      );
    } finally {
      setLoading(false);
      isStartingRef.current = false;
    }
  }

  function resetState() {
    setSession(null);
    setError("");
    setLoading(false);
    setPrefetchStatus("idle");
    setMicWarmupStatus("idle");
    isStartingRef.current = false;
    prefetchedSessionRef.current = null;
    prefetchPromiseRef.current = null;
    releasePrewarmedMicrophone();
  }

  function endSession() {
    resetState();
    setWidgetState("closed");
  }

  function closeAssistant() {
    resetState();
    setWidgetState("closed");
  }

  const readinessLabel =
    prefetchStatus === "ready" && micWarmupStatus === "ready"
      ? "Ready to connect"
      : prefetchStatus === "loading" || micWarmupStatus === "requesting"
        ? "Preparing session"
        : micWarmupStatus === "blocked"
          ? "Mic permission needed"
          : "Voice assistant";

  if (widgetState === "closed") {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
          @keyframes fab-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); } 50% { box-shadow: 0 0 0 10px rgba(59,130,246,0); } }
        `}</style>
        <button
          className="fixed bottom-6 right-6 z-[9999] flex cursor-pointer items-center gap-3 rounded-full py-2.5 pl-2.5 pr-5 text-white transition-all hover:-translate-y-0.5 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            border: "1px solid rgba(59,130,246,0.35)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(59,130,246,0.1)",
            fontFamily: "'DM Sans', sans-serif",
            animation: "fab-pulse 3s ease-in-out infinite",
          }}
          onClick={openPreview}
          aria-label="Open Paramount Intelligence Assistant"
        >
          <span
            className="grid h-10 w-10 flex-none place-items-center rounded-full text-lg text-blue-200"
            style={{
              background: "rgba(37,99,235,0.4)",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          >
            ◈
          </span>
          <span>
            <strong className="block text-sm font-bold leading-tight text-white">
              Ask Paramount AI
            </strong>
            <small className="mt-0.5 block text-[11px] font-medium leading-tight text-blue-300/80">
              Voice assistant
            </small>
          </span>
        </button>
      </>
    );
  }

  if (widgetState === "active") {
    return (
      <div
        className="fixed inset-0 z-[9999] p-4 text-white max-[640px]:p-0"
        style={{
          background: "rgba(2,6,23,0.88)",
          backdropFilter: "blur(16px)",
        }}
      >
        {session ? (
          <LiveKitRoom
            serverUrl={session.serverUrl}
            token={session.token}
            connect={true}
            audio={{
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            }}
            video={false}
            connectOptions={LIVEKIT_CONNECT_OPTIONS}
            onDisconnected={endSession}
            onError={(err) => {
              console.error("[AssistantWidget] LiveKit error:", err);
              setError(err?.message || "LiveKit connection failed");
            }}
            onMediaDeviceFailure={(failure, kind) => {
              console.warn(
                "[AssistantWidget] Media device failure:",
                failure,
                kind,
              );
              setError(
                kind === "audioinput"
                  ? "Microphone access failed. Please allow microphone permission and try again."
                  : "Media device failed. Please try again.",
              );
            }}
          >
            <AvatarSupportChat
              roomName={session.roomName}
              onDisconnect={endSession}
              onMinimize={endSession}
            />
          </LiveKitRoom>
        ) : (
          <AssistantConnectingScreen
            error={error}
            loading={loading}
            onRetry={startSession}
            onClose={closeAssistant}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;800&display=swap');
        .widget-card-enter { animation: slideUp 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .prompt-btn { transition: all 0.15s ease; }
        .prompt-btn:hover { background: rgba(37,99,235,0.08) !important; border-color: rgba(59,130,246,0.3) !important; transform: translateX(2px); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div
        className="widget-card-enter fixed bottom-6 right-6 z-[9999] w-[min(480px,calc(100vw-32px))] max-[560px]:bottom-3 max-[560px]:right-3 max-[560px]:w-[calc(100vw-24px)]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div
          className="overflow-hidden rounded-2xl text-white"
          style={{
            background:
              "linear-gradient(160deg, #080f1e 0%, #0d1b30 60%, #0a1628 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.08)",
          }}
        >
          <div
            className="flex items-start justify-between gap-3 px-5 pb-4 pt-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 flex-none items-center justify-center rounded-xl text-xl text-blue-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(99,102,241,0.15))",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                ◈
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400">
                  Paramount Intelligence
                </p>
                <h2 className="mt-0.5 text-lg font-bold leading-tight tracking-tight text-white">
                  AI Virtual Assistant
                </h2>
              </div>
            </div>
            <button
              onClick={closeAssistant}
              className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-slate-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              aria-label="Close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 1L9 9M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 px-5 py-4">
            <div
              className="flex items-center justify-between rounded-xl px-3 py-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${prefetchStatus === "ready" ? "bg-emerald-400" : prefetchStatus === "error" ? "bg-amber-400" : "bg-blue-400"}`}
                />
                <span className="text-xs font-semibold text-slate-300">
                  {readinessLabel}
                </span>
              </div>
              {(prefetchStatus === "loading" ||
                micWarmupStatus === "requesting") && (
                <span
                  className="h-3.5 w-3.5 rounded-full border-[1.5px] border-blue-400/20 border-t-blue-400"
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              Ask about AI strategy, engineering, automation, cloud, data, or
              career opportunities at Paramount Intelligence.
            </p>

            {error && (
              <div
                className="rounded-xl px-3 py-2.5 text-[13px] text-red-300"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(248,113,113,0.2)",
                }}
              >
                {error}
              </div>
            )}

            <button
              className="w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #1e40af, #2563eb, #1d4ed8)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
              }}
              onClick={startSession}
              disabled={loading}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span
                      className="h-4 w-4 rounded-full border-[1.5px] border-white/20 border-t-white"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    />
                    Starting session…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="white" opacity="0.9" />
                      <path
                        d="M6 16c0-3.3 2.7-5 6-5s6 1.7 6 5"
                        fill="white"
                        opacity="0.9"
                      />
                    </svg>
                    Start Voice Session
                  </>
                )}
              </span>
            </button>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Try asking
              </p>
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  className="prompt-btn w-full rounded-xl px-3.5 py-2.5 text-left text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onClick={startSession}
                  disabled={loading}
                >
                  <span className="mr-2 text-blue-400 opacity-70">
                    {p.icon}
                  </span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="px-5 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-[11px] leading-snug text-slate-600">
              Microphone permission may be requested before connection so the
              voice session can start faster. Audio is not stored.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
