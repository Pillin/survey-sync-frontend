import { makeQRCode } from "@solid-integrations/qrcode-generator";
import { PARTYKIT_FRONTEND_HOST } from "../Utils/constants";

const InitialPage = () => {
  const qrCode = makeQRCode(PARTYKIT_FRONTEND_HOST);

  return (
    <section class="">
      <img src={qrCode} width="100%" />
    </section>
  );
};

export default InitialPage;
