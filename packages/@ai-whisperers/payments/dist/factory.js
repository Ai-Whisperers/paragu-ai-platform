const registry = new Map();
export function registerGateway(adapter) {
    registry.set(adapter.name, adapter);
}
export function getGateway(name) {
    return registry.get(name);
}
export function getRegisteredGateways() {
    return Array.from(registry.keys());
}
export function processPayment(name, req) {
    const gateway = registry.get(name);
    if (!gateway) {
        return Promise.resolve({ ok: false, error: `Unknown gateway: ${name}` });
    }
    return gateway.processPayment(req);
}
//# sourceMappingURL=factory.js.map