export function hexToAddress(hex: string) {
  return "0x" + hex.slice(-40);
}

export function addressToLower(address: string) {
  return "0x" + address.slice(2).toLowerCase();
}
