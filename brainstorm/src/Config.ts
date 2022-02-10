import { AzureClientProps, AzureFunctionTokenProvider, LOCAL_MODE_TENANT_ID } from "@fluidframework/azure-client";
import { SharedMap } from "fluid-framework";
import { getRandomName } from "@fluidframework/server-services-client";
import { v4 as uuid } from 'uuid';
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";

export const useAzure = process.env.REACT_APP_FLUID_CLIENT === "azure";

export const containerSchema = {
    initialObjects: {
        map: SharedMap,
    },
}

export const userConfig = {
    id: uuid(),
    name: getRandomName(),
};

export const connectionConfig: AzureClientProps = useAzure ? { connection: {
    tenantId: "YOUR-TENANT-ID-HERE",
    tokenProvider: new AzureFunctionTokenProvider("AZURE-FUNCTION-URL" + "/api/GetAzureToken", { userId: "test-user", userName: "Test User" }),
    orderer: "ENTER-ORDERER-URL-HERE",
    storage: "ENTER-STORAGE-URL-HERE",
}} : { connection: {
    tenantId: "24045716-59f0-4cfb-aa78-0b05c21147b5", //LOCAL_MODE_TENANT_ID,
    tokenProvider: new InsecureTokenProvider("861cb98ab994bf97ae85b9eed2f4872b", userConfig),
    orderer: "https://alfred.westus2.fluidrelay.azure.com",
    storage: "https://historian.westus2.fluidrelay.azure.com",
}} ;
