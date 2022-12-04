import { withSessionRoute } from "lib/withSession";
import hmacSha256 from "crypto-js/hmac-sha256";
import sha256 from "crypto-js/sha256";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(loginRoute);
const TELRGRAM_BOT_TOKEN = process.env.TELRGRAM_BOT_TOKEN || "";
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:

  if (req.body.user) {
    const verifyResult = checkTelegramAuthorization(
      req.body.user,
      TELRGRAM_BOT_TOKEN
    );
    if (verifyResult) {
      req.session.user = req.body.user;
      await req.session.save();
      return res.send({ status: "success" });
    }
  }

  res.status(403).send({ errMsg: "Your data not correct." });
}

const checkTelegramAuthorization = (
  authData: { [key: string]: unknown },
  tgBotToken: string
) => {
  const _authData = { ...authData };
  const { hash: checkHash } = authData;

  delete _authData.hash;

  const dataCheckArr = Object.keys(_authData)
    .map((key) => `${key}=${_authData[key]}`)
    .sort()
    .join("\n");

  const secretKey = sha256(tgBotToken);
  const hash = String(hmacSha256(dataCheckArr, secretKey));

  return hash === checkHash; // returns true if hash is valid
};
