import type { User } from "@/types/api";
import { GERMAN_STATES } from "./states";

interface BaseField {
  name: string;
  placeholder: string;
}

export interface InputFieldConfig extends BaseField {
  kind?: "input";
  type: "text" | "email" | "password" | "number" | "tel";
  maxLength?: number;
  minLength?: number;
  /** Strip whitespace while typing (emails and passwords). */
  noSpaces?: boolean;
  required?: boolean;
  defaultValue?: string;
  min?: number;
  max?: number;
}

export interface SelectFieldConfig extends BaseField {
  kind: "select";
  options: readonly string[];
  required?: boolean;
}

export type FormFieldConfig = InputFieldConfig | SelectFieldConfig;

const email = (defaultValue?: string): InputFieldConfig => ({
  type: "email",
  name: "email",
  placeholder: "enter your email",
  maxLength: 50,
  noSpaces: true,
  required: true,
  defaultValue,
});

const password = (name: string, placeholder: string, required = true): InputFieldConfig => ({
  type: "password",
  name,
  placeholder,
  maxLength: 50,
  noSpaces: true,
  required,
});

export const LOGIN_FIELDS: FormFieldConfig[] = [
  email(),
  password("pass", "enter your password"),
];

const name = (defaultValue?: string): InputFieldConfig => ({
  type: "text",
  name: "name",
  placeholder: "enter your name",
  maxLength: 50,
  required: true,
  defaultValue,
});

const phone = (defaultValue?: string): InputFieldConfig => ({
  type: "tel",
  name: "phone",
  placeholder: "enter your phone number",
  maxLength: 20,
  required: true,
  defaultValue,
});

export const REGISTER_FIELDS: FormFieldConfig[] = [
  name(),
  email(),
  phone(),
  { ...password("pass", "enter your password (min. 8 characters)"), minLength: 8 },
  password("confirm_pass", "confirm your password"),
];

/** The API only lets buyers change name and phone (email and password are fixed). */
export const updateProfileFields = (user: Pick<User, "name" | "phone">): FormFieldConfig[] => [
  name(user.name),
  phone(user.phone),
];
export const UPDATE_ADDRESS_FIELDS: FormFieldConfig[] = [
  { type: "text", name: "flat", placeholder: "flat no. and building name", maxLength: 50, required: true },
  { type: "text", name: "street", placeholder: "street name", maxLength: 50, required: true },
  { type: "text", name: "city", placeholder: "city name", maxLength: 50, required: true },
  { kind: "select", name: "state", placeholder: "select state --", options: GERMAN_STATES, required: true },
  { type: "text", name: "country", placeholder: "", maxLength: 50, required: true, defaultValue: "Germany" },
  { type: "number", name: "post_code", placeholder: "post code", min: 0, max: 999999, required: true },
];
export const FORGOT_PASSWORD_FIELDS: FormFieldConfig[] = [email()];

export const RESET_PASSWORD_FIELDS: FormFieldConfig[] = [
  { ...password("new_pass", "enter your new password (min. 8 characters)"), minLength: 8 },
  password("confirm_pass", "confirm your new password"),
];
