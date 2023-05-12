import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalState } from "./store";
import { ConnectButton, useAccount } from "@particle-network/connect-react-ui";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated] = useGlobalState("isAuthenticated");
  const address = useAccount();
  let location = useLocation();

  //if not authenticated or no address connected
  if (!isAuthenticated || !address) {
    return (
      <Navigate to="/app/wallet-connect" state={{ from: location }} replace />
    );
  }
  return (
    <>
      <div style={{ display: "none" }}>
        <ConnectButton />
      </div>
      {children}
    </>
  );
};

export default ProtectedRoute;