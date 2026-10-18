
import { useState } from "react";

export function useQueue() {
  const [tokens, setTokens] = useState([]);

  function joinQueue(service) {
    const existingToken = tokens.find(
      (token) => token.serviceId === service.id
    );

    if (existingToken) {
      return {
        success: false,
        message: `You already joined ${service.name}.`,
      };
    }

    const tokenNumber = String(
      service.waiting + tokens.length + 1
    ).padStart(3, "0");

    const token = {
      id: `${service.tokenPrefix}-${tokenNumber}`,
      serviceId: service.id,
      serviceName: service.name,
      wait: service.estimatedWait,
      status: "Waiting",
    };

    setTokens((currentTokens) => [...currentTokens, token]);

    return {
      success: true,
      token,
    };
  }

  function cancelToken(tokenId) {
    setTokens((currentTokens) =>
      currentTokens.filter((token) => token.id !== tokenId)
    );
  }

  return {
    tokens,
    joinQueue,
    cancelToken,
  };
}
