import { controlAgent, posAgent } from "../../api";
import { reactiveState } from "core/state";

export async function getPos() {
  return await Promise.all([posAgent.getPosMap(), posAgent.getPosRecord()]);
}

export async function getControl() {
  return await Promise.all([
    controlAgent.getControlMap(),
    controlAgent.getControlRecord(),
  ]);
}

/**
 * Get part's type from its name
 * should return
 */
export function getPartType(partName: string) {
  const partTypeMap = reactiveState.partTypeMap();
  return partTypeMap[partName];
}

export * from "./math";
export * from "./localStorage";
