# Workaround Catalog

Use only the entry matching the suspected repair. These examples illustrate ways to hide a failure, not bans on syntax or libraries. Establish the violated contract and causal evidence before proposing a change. Preserve intentional error handling, optional data, bounded polling, supported extensions, and authorized adapters. Code snippets are illustrative; reuse the project's stack rather than adding their named libraries.

## Type System Evasion

### W-01: Blanket `any` Type

```typescript
// WORKAROUND
function processData(data: any) {
  return data.items.map((item: any) => item.name);
}

// PROPER FIX
interface DataPayload {
  items: Array<{ name: string; id: string }>;
}
function processData(data: DataPayload) {
  return data.items.map((item) => item.name);
}
```

**Harm:** Disables all type checking. Runtime errors instead of compile-time errors.

### W-02: Type Assertion to Force Compilation

```typescript
// WORKAROUND
const config = {} as AppConfig;
// Missing required fields — will crash at runtime

// PROPER FIX
const config: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};
```

**Harm:** `as` bypasses excess property checks. Missing fields become runtime `undefined`.

### W-03: Non-Null Assertion on Uncertain Values

```typescript
// WORKAROUND
const user = users.find((u) => u.id === id)!;
// Crashes if user not found

// PROPER FIX
const user = users.find((u) => u.id === id);
if (!user) {
  throw new UserNotFoundError(id);
}
```

**Risk:** An assertion without an established non-null invariant can conceal a missing-value path. An independently proven invariant may justify it.

### W-04: Generic `object` or `Record<string, unknown>`

```typescript
// WORKAROUND
function save(data: Record<string, unknown>) {
  // No type safety inside
}

// PROPER FIX
function save(data: CreateUserInput) {
  // Full type safety, autocomplete, refactoring support
}
```

**Risk:** A broad type can hide a known domain shape. `unknown` and `Record<string, unknown>` remain appropriate for genuinely unknown boundary data until validated.

### W-05: Double Assertion (`as unknown as T`)

```typescript
// WORKAROUND
const value = response as unknown as TargetType;
// Forces incompatible types to match

// PROPER FIX
// If the types truly don't match, the data needs transformation:
const value = transformResponse(response);
// Where transformResponse handles the actual mapping
```

**Harm:** The most aggressive type lie. Hides fundamental mismatches in data shapes.

## Lint and Warning Suppression

### W-06: Inline eslint-disable

```typescript
// WORKAROUND
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (e: any) => {};

// PROPER FIX
const handler = (e: React.ChangeEvent<HTMLInputElement>) => {};
```

**Risk:** An unexplained suppression can conceal a real defect. Confirm that the rule applies and preserve justified, narrowly scoped exceptions.

### W-07: @ts-ignore / @ts-expect-error Without Fix Plan

```typescript
// WORKAROUND
// @ts-ignore
brokenLibraryCall(args);

// PROPER FIX (if library types are wrong)
// Create a typed wrapper:
function safeLibraryCall(args: CorrectArgs): ReturnType {
  return (brokenLibraryCall as unknown as CorrectSignature)(args);
}
// The assertion is isolated to ONE place with documentation
```

**Harm:** Disables type checking for an entire line. Any error on that line is invisible.

### W-08: Suppressing Deprecation Warnings

```typescript
// WORKAROUND
// @ts-expect-error - deprecated but still works
oldApi.legacyMethod();

// PROPER FIX
newApi.currentMethod(); // Migrate to the replacement
```

**Harm:** Deprecated APIs are removed in future versions. The workaround defers a breaking change.

## Error Swallowing

### W-09: Empty Catch Block

```typescript
// WORKAROUND
try {
  await riskyOperation();
} catch {
  // nothing
}

// PROPER FIX
try {
  await riskyOperation();
} catch (error) {
  logger.error("riskyOperation failed", { error });
  // Either: re-throw, return error type, or handle specifically
}
```

**Risk:** An empty catch can hide an unexpected failure and remove diagnostic evidence. Ignoring an expected outcome needs a contract that justifies it.

### W-10: Catch-and-Default

```typescript
// WORKAROUND
let config: Config;
try {
  config = loadConfig();
} catch {
  config = defaultConfig; // Hides broken config file
}

// PROPER FIX
let config: Config;
try {
  config = loadConfig();
} catch (error) {
  logger.warn("Config load failed, using defaults", { error });
  // OR: throw new ConfigError("Cannot load config", { cause: error });
  config = defaultConfig;
}
```

**Harm:** Silently uses defaults when the real config is corrupt. Behavior diverges from intent.

### W-11: Overly Broad Catch

```typescript
// WORKAROUND
try {
  processOrder(order);
} catch (error) {
  // Catches EVERYTHING: network, validation, bugs, OOM
  return { success: false };
}

// PROPER FIX
try {
  processOrder(order);
} catch (error) {
  if (error instanceof ValidationError) {
    return { success: false, errors: error.details };
  }
  if (error instanceof NetworkError) {
    return { success: false, retry: true };
  }
  throw error; // Unknown errors bubble up
}
```

**Harm:** Treats bugs the same as expected errors. Programming mistakes become "handled."

### W-12: `.catch(() => null)` on Promises

```typescript
// WORKAROUND
const data = await fetchUser(id).catch(() => null);
if (!data) return; // Was it a 404? A network error? A bug?

// PROPER FIX
try {
  const data = await fetchUser(id);
  return processUser(data);
} catch (error) {
  if (error instanceof NotFoundError) return null;
  throw error;
}
```

**Harm:** Collapses all failure modes into `null`. Impossible to distinguish errors from empty results.

## Timing and Lifecycle Hacks

### W-13: setTimeout(fn, 0) for Render Timing

```typescript
// WORKAROUND
useEffect(() => {
  setTimeout(() => {
    ref.current?.focus();
  }, 0);
}, []);

// PROPER FIX
useEffect(() => {
  if (ref.current) ref.current.focus();
}, [isReady]); // Depend on actual readiness, not timing
```

**Harm:** Creates race condition. Works "most of the time" but fails under load or slow devices.

### W-14: Arbitrary Sleep in Tests

```typescript
// WORKAROUND
test("data loads", async () => {
  render(<DataView />);
  await new Promise((r) => setTimeout(r, 500));
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

// PROPER FIX
test("data loads", async () => {
  render(<DataView />);
  await waitFor(() => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  });
});
```

**Harm:** Flaky tests. Passes on fast machines, fails on CI. Or wastes time on slow fixed delays.

### W-15: Retries That Mask a Failed Operation

```typescript
// SUSPECT: reruns a failed operation without establishing that retry is safe
try {
  return await commitOrder(order);
} catch {
  return commitOrder(order);
}
```

**Risk:** A retry can hide a lifecycle defect or repeat an operation that already produced side effects. Establish the failure mode and idempotency before retrying. Bounded polling of observable readiness is different: it is appropriate when the producer exposes state rather than a reliable event subscription. If using events, account for already-ready state, timeout, and listener cleanup.

## Monkey Patching and Runtime Mutation

### W-16: Prototype Extension

```typescript
// WORKAROUND
Array.prototype.last = function () {
  return this[this.length - 1];
};

// PROPER FIX
import { last } from "es-toolkit";
const lastItem = last(items);
```

**Risk:** Unowned global prototype changes can collide or alter enumeration. A project's supported extension mechanism may intentionally replace or extend methods; assess that contract rather than banning extensions.

### W-17: Global State Override

```typescript
// WORKAROUND
window.__APP_CONFIG__ = { debug: true };

// PROPER FIX
const config = createConfig({ debug: isDevelopment() });
// Pass through dependency injection or context
```

**Risk:** An unexplained override can bypass the authoritative state owner and leak across sessions. Preserve state explicitly owned by the runtime or project contract.

### W-18: Replacing Library Internals

```typescript
// WORKAROUND
router._routes.push(customRoute);

// PROPER FIX
router.addRoute(customRoute); // Use official API
// Or: extend via plugin/middleware system
```

**Harm:** Breaks on library updates. Internal APIs change without notice.

## Defensive Duplication

### W-19: Optional Chaining Everywhere

```typescript
// WORKAROUND
const name = data?.user?.profile?.name ?? "Unknown";
const email = data?.user?.contacts?.primary?.email ?? "";
const avatar = data?.user?.profile?.images?.avatar?.url ?? "/default.png";

// PROPER FIX — validate at entry point
const user = Schema.decodeUnknownSync(UserSchema)(data);
// Then use with confidence:
const { name, email, avatarUrl } = user;
```

**Risk:** Defaults can hide a required field's absence. Optional chaining is appropriate for genuinely optional data; validate only the guarantees the consumer requires.

### W-20: Fallback Chains

```typescript
// WORKAROUND
const id = item.id ?? item._id ?? item.uuid ?? item.key ?? generateId();

// PROPER FIX — normalize at ingestion
interface NormalizedItem {
  id: string;
  // ... other fields
}
function normalizeItem(raw: ExternalItem): NormalizedItem {
  return { id: raw.id ?? raw._id ?? raw.uuid, ... };
}
// Normalize ONCE, use clean data everywhere
```

**Harm:** Fallback logic duplicated across the codebase. Each site may have different fallback order.

## Copy-Paste Adaptation

### W-21: Copied Handler with Tweaks

```typescript
// WORKAROUND — copied from handleUserCreate and "adapted"
async function handleProjectCreate(req: Request) {
  // 150 lines, 90% identical to handleUserCreate
  // 3 subtle bugs from incomplete adaptation
}

// PROPER FIX — extract shared pattern
const handleUserCreate = createEntityHandler(UserSchema, userRepo);
const handleProjectCreate = createEntityHandler(ProjectSchema, projectRepo);
```

**Harm:** When a bug is fixed in the original, the copy is forgotten. Bugs diverge.

### W-22: Duplicated Validation Logic

```typescript
// WORKAROUND — same validation in 5 places
if (!email || !email.includes("@") || email.length > 255) { ... }
// Repeated in: signup, profile update, invitation, import, admin

// PROPER FIX — single source of truth
const EmailSchema = Schema.String.pipe(
  Schema.pattern(/^[^@]+@[^@]+\.[^@]+$/),
  Schema.maxLength(255),
  Schema.brand("Email"),
);
// Use EmailSchema everywhere
```

**Harm:** Validation rules drift. One place allows 255 chars, another 320. Inconsistent behavior.

## Environment and Build Hacks

### W-23: Environment Variable as Feature Flag

```typescript
// WORKAROUND
if (process.env.SKIP_VALIDATION === "true") {
  return data; // Skip validation in "problematic" environments
}

// PROPER FIX
// Fix the validation. If it's too slow, optimize it.
// If it catches real errors, those errors need fixing.
// Environment-specific behavior bypasses create parity gaps.
```

**Harm:** Creates divergence between environments. Bugs that only appear in production.

### W-24: Build Script Workarounds

```bash
# WORKAROUND
npm run build || true  # Ignore build errors
npm run build 2>/dev/null  # Suppress error output

# PROPER FIX
npm run build  # Fix the build errors
```

**Harm:** Ships broken code. Errors are invisible. Failures compound silently.

## Test-Specific Workarounds

### W-25: Test-Only Methods in Production Code

```typescript
// WORKAROUND
class Database {
  // Only used in tests!
  _resetForTesting() {
    this.connections = [];
    this.cache.clear();
  }
}

// PROPER FIX — test utilities separate from production
// In test-utils/database.ts:
export function resetDatabase(db: Database) {
  // Use public API or test-specific setup
}
```

**Harm:** Production code polluted with test concerns. Dangerous if accidentally called.

### W-26: Mocking to Avoid Understanding

```typescript
// WORKAROUND — mock everything, test nothing
vi.mock("./database");
vi.mock("./auth");
vi.mock("./logger");
vi.mock("./cache");
test("it works", () => {
  expect(true).toBe(true); // What are we testing?
});

// PROPER FIX — mock minimally, test behavior
vi.mock("./database"); // Only mock the external boundary
test("creates user in database", async () => {
  const result = await createUser(validInput);
  expect(database.insert).toHaveBeenCalledWith(expectedRecord);
});
```

**Risk:** A test can pass without exercising its intended guarantee. Inspect the owning check and use a mock only where it preserves that observation; no additional skill is required by this catalog.

### W-27: Skipped Tests as "TODO"

```typescript
// WORKAROUND
test.skip("handles concurrent updates", () => {
  // TODO: fix this test
});

// PROPER FIX
// Repair the failing behavior or an evidenced invalid expectation.
// Report unexecuted coverage honestly; do not delete an accepted check
// or defer the obligation without the user's decision.
```

**Risk:** A skipped required check leaves a verification gap. Explicit platform selection or an authorized deferral is different and must remain visible.

## Architecture Workarounds

### W-28: God Object / Utility Dumping Ground

```typescript
// WORKAROUND
// utils.ts — 2000 lines, 47 unrelated functions
export function formatDate() { ... }
export function validateEmail() { ... }
export function calculateTax() { ... }
export function parseMarkdown() { ... }

// PROPER FIX
// domain-specific modules
// date-formatting.ts, email-validation.ts, tax-calculator.ts, etc.
```

**Risk:** Unrelated responsibilities can accumulate accidental dependencies and make changes harder to isolate. Confirm actual coupling before splitting modules.

### W-29: Props Drilling Instead of Proper State

```typescript
// WORKAROUND — passing props through 6 levels
<App user={user}>
  <Layout user={user}>
    <Sidebar user={user}>
      <Nav user={user}>
        <UserBadge user={user} />

// PROPER FIX — context or state management
const UserContext = createContext<User | null>(null);
// Or: Zustand store, or TanStack Query cache
```

**Risk:** Unrelated intermediaries can become coupled to data they do not own. Prefer direct arguments when clear; introduce shared state only when the actual ownership and consumers justify it.

### W-30: Feature Flags That Never Expire

```typescript
// WORKAROUND
if (featureFlags.newCheckout) {
  // "new" checkout — shipped 18 months ago
  return <NewCheckout />;
}
return <OldCheckout />; // Dead code? Or still used?

// PROPER FIX
// Remove the flag and the old code after rollout is confirmed.
return <Checkout />;
```

**Harm:** Dead code branches accumulate. Nobody knows which flags are active. Testing surface doubles.

## The Pattern

A symptom-hiding repair can follow this pattern:

1. **A signal appears** (compiler error, test failure, runtime crash)
2. **The workaround silences the signal** (type assertion, try-catch, delay)
3. **The underlying problem remains** and worsens over time
4. **The workaround gets copied** by developers who see it as precedent
5. **Repeated reliance increases repair scope** as more consumers depend on the hidden failure

**Break the pattern:** Fix the established cause or document the bounded external limitation. Preserve intentional handling that keeps the contracted behavior and relevant failures observable.
