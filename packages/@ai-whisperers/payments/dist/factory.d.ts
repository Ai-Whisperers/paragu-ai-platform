export interface PaymentRequest {
    order: {
        id: string;
        [key: string]: unknown;
    };
    total: number;
    items?: unknown[];
    customer?: {
        email?: string;
        name?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
export interface GatewayResult {
    ok: boolean;
    sandbox?: boolean;
    redirectUrl?: string;
    url?: string;
    error?: unknown;
}
export interface GatewayAdapter {
    name: string;
    processPayment: (req: PaymentRequest) => Promise<GatewayResult>;
}
export declare function registerGateway(adapter: GatewayAdapter): void;
export declare function getGateway(name: string): GatewayAdapter | undefined;
export declare function getRegisteredGateways(): string[];
export declare function processPayment(name: string, req: PaymentRequest): Promise<GatewayResult>;
//# sourceMappingURL=factory.d.ts.map