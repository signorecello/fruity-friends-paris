import { Button } from "@/components/button/Button";
import styles from "../../styles/auth/Login.module.scss";
import { useState } from "react";
import { CredentialType, IDKitWidget, ISuccessResult } from "@worldcoin/idkit";
import { clientSideRequest } from "@/utils/api";

export default function Worldcoin() {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>Fruity Friends</p>
        <IDKitWidget
          app_id={process.env.NEXT_PUBLIC_WLD_CLIENT_ID!} // obtained from the Developer Portal
          action="humancheck" // this is your action name from the Developer Portal
          onSuccess={async (res: ISuccessResult) => {
            console.log(res);
            const result = await clientSideRequest(
              "/api/worldcoin/verify",
              res
            );
            console.log(result);
            setLoading(false);
          }} // callback when the modal is closed
          handleVerify={() => {
            console.log("verify");
            setLoading(false);
          }}
          credential_types={[CredentialType.Orb] as CredentialType[]}
          enableTelemetry
        >
          {({ open }) => (
            <Button
              onClick={() => {
                setLoading(true);
                open();
              }}
              text="I'm not a robot"
              loading={loading}
              loadingText="Making sure..."
            />
          )}
        </IDKitWidget>
      </div>
    </div>
  );
}
