import assert from 'node:assert/strict';

// Explore observed keyboard transitions; scene layout, not command index order,
// determines which arrow reaches a given action.
export async function focusChoice({target, count, readIndex, press}) {
  const directions = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];
  const graph = new Map();
  for (let step = 0; step < count * count * 8; step++) {
    const current = await readIndex();
    if (current === target) return;
    if (!graph.has(current)) graph.set(current, new Map());
    const edges = graph.get(current);
    let key = directions.find(direction => !edges.has(direction));
    if (!key) {
      const queue = [{index:current, path:[]}], visited = new Set([current]);
      while (queue.length && !key) {
        const node = queue.shift(), known = graph.get(node.index);
        if (!known || known.size < directions.length) { key = node.path[0]; break; }
        for (const [direction, next] of known) {
          if (visited.has(next)) continue;
          visited.add(next); queue.push({index:next, path:[...node.path, direction]});
        }
      }
    }
    assert.ok(key, `Choice ${target} is not reachable from focus ${current} through public arrow inputs.`);
    await press(key);
    edges.set(key, await readIndex());
  }
  assert.fail(`Keyboard traversal exceeded its bound before reaching choice ${target}.`);
}
