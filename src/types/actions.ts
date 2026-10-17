/** Result returned by Server Actions used with `useActionState`. */
export interface ActionState {
  error?: string;
  success?: string;
  /** Submitted non-secret values, so a failed submit does not wipe the form. */
  values?: Record<string, string>;
}
