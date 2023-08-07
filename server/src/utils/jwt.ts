import jwt from "jsonwebtoken";
import config from "../config";

const { publicKey: encodedPublic, privateKey: encodedPrivate } = config;

const publicKey = Buffer.from(encodedPublic as string, "base64").toString(
  "ascii"
);

const privateKey = Buffer.from(encodedPrivate as string, "base64").toString(
  "ascii"
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function signJwt(object: any, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}
