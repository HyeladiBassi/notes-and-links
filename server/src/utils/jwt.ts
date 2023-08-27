import jwt from "jsonwebtoken";
import config from "../config";

const { publicKey: encodedPublic, privateKey: encodedPrivate } = config;

const publicKey = Buffer.from(encodedPublic as string, "base64").toString(
  "ascii"
  );

const privateKey = Buffer.from(encodedPrivate as string, "base64").toString(
  "ascii"
);

export function signJwt(
  object: any,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(authorizationToken: string | undefined): T | null {
  try {
    const token = authorizationToken && authorizationToken.split('Bearer ')[1];

    if (!token) return null;

    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}
