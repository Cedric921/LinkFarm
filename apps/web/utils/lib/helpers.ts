import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function clsxm(...classes: (string | ClassValue)[]) {
  return twMerge(clsx(...classes));
}

export const calculateReadingTime = (articleContent: string): number => {
  const wordsPerMinute = 250;
  const wordCount = articleContent.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};
// dynamicBlurDataUrl.js
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : process.env.NEXT_PUBLIC_DOMAIN;

export async function dynamicBlurDataUrl(url: string) {
  const base64str = await fetch(
    `${baseUrl}/_next/image?url=${url}&w=16&q=75`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64")
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

export const formContactSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "The name you have entered is invalid.",
      required_error: "The field is required",
    })
    .min(3)
    .max(255),
  email: z
    .string({
      invalid_type_error: "The email you have entered is invalid.",
      required_error: "The field is required",
    })
    .email({ message: "please enter a valid email address" })
    .min(5)
    .max(255),

  company: z
    .string({
      invalid_type_error:
        "The name of the company you have entered is invalid.",
      required_error: "The field is required",
    })
    .min(2)
    .max(255),
  subject: z
    .string({
      invalid_type_error: "The subject you have entered is invalid.",
      required_error: "The field is required",
    })
    .min(2)
    .max(255),
  message: z
    .string({
      invalid_type_error: "The message you have entered is invalid.",
      required_error: "The field is required",
    })
    .min(10),
});

export const formCalculatorSchema = z.object({
  jobAmount: z
    .string({
      invalid_type_error: "The amount you have entered is invalid.",
      required_error: "The proposed amount is required",
    })
    .min(2),
});
