import { useState, useCallback } from "react"
import type { ToastProps } from "@/components/ui/toast"

interface ToastState {
  id: string
  title?: string
  description?: string
  variant?: ToastProps["variant"]
  duration?: number
}

let listeners: Array<(toasts: ToastState[]) => void> = []
let toastsState: ToastState[] = []

function dispatch(action: { type: "add" | "remove"; toast?: ToastState; id?: string }) {
  if (action.type === "add" && action.toast) {
    toastsState = [...toastsState, action.toast]
  } else if (action.type === "remove" && action.id) {
    toastsState = toastsState.filter((t) => t.id !== action.id)
  }
  listeners.forEach((l) => l(toastsState))
}

export function toast({
  title,
  description,
  variant = "default",
  duration = 4000,
}: {
  title?: string
  description?: string
  variant?: ToastProps["variant"]
  duration?: number
}) {
  const id = Math.random().toString(36).slice(2)
  dispatch({ type: "add", toast: { id, title, description, variant, duration } })
  setTimeout(() => dispatch({ type: "remove", id }), duration)
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>(toastsState)

  useCallback(() => {
    listeners.push(setToasts)
    return () => {
      listeners = listeners.filter((l) => l !== setToasts)
    }
  }, [])()

  // Actually subscribe
  if (!listeners.includes(setToasts)) {
    listeners.push(setToasts)
  }

  return { toasts, toast, dismiss: (id: string) => dispatch({ type: "remove", id }) }
}
