// Visual lessons are read-only: they never change schedules or review history.
const esc = (x) =>
  String(x ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const frame = (title, cells, active, explanation, state = "") => ({
  title,
  cells,
  active,
  explanation,
  state,
});
export const labs = {
  "lc-1": {
    title: "Two Sum: watch the complement lookup",
    cases: [
      { label: "Different values", values: [4, 9, 6], target: 10 },
      { label: "Duplicate values", values: [4, 4], target: 8 },
      { label: "Negative values", values: [-3, 8, 5], target: 2 },
    ],
    trace({ values, target }) {
      const seen = new Map(),
        frames = [
          frame(
            "Start with an empty map",
            values,
            [],
            "We need two different positions. The map will contain only values to the left of the current position.",
            `target = ${target}; seen = {}`,
          ),
        ];
      for (let i = 0; i < values.length; i++) {
        const x = values[i],
          need = target - x;
        frames.push(
          frame(
            `Read index ${i}: need ${need}`,
            values,
            [i],
            `${target} − ${x} = ${need}. Look for the partner before storing the current value.`,
            `seen = ${JSON.stringify(Object.fromEntries(seen))}`,
          ),
        );
        if (seen.has(need)) {
          frames.push(
            frame(
              "Pair found",
              values,
              [seen.get(need), i],
              `${need} + ${x} = ${target}. These are distinct positions, even when the values are equal.`,
              `return [${seen.get(need)}, ${i}]`,
            ),
          );
          return frames;
        }
        seen.set(x, i);
        frames.push(
          frame(
            "Remember this value",
            values,
            [i],
            `No earlier partner exists. Store ${x} → ${i} so a later value can use it.`,
            `seen = ${JSON.stringify(Object.fromEntries(seen))}`,
          ),
        );
      }
      return frames;
    },
  },
  "lc-42": {
    title: "Trapping Rain Water: inspect each column",
    cases: [
      { label: "Two basins", values: [3, 0, 2, 0, 4] },
      { label: "No container", values: [1, 2, 3, 4] },
      { label: "One bowl", values: [2, 0, 2] },
    ],
    trace({ values }) {
      let total = 0;
      const frames = [
        frame(
          "The shorter wall sets the water level",
          values,
          [],
          "At each column, water cannot rise above either enclosing wall. This teaching model uses left/right maxima; the Java solution optimizes the same idea with two pointers.",
        ),
      ];
      for (let i = 0; i < values.length; i++) {
        const left = Math.max(...values.slice(0, i + 1)),
          right = Math.max(...values.slice(i)),
          water = Math.min(left, right) - values[i];
        total += water;
        const f = frame(
          `Column ${i}: ${water} water unit${water === 1 ? "" : "s"}`,
          values,
          [i],
          `The tallest left wall is ${left}; the tallest right wall is ${right}. min(${left}, ${right}) − ${values[i]} = ${water}.`,
          `total = ${total}`,
        );
        f.water = values.map((v, j) =>
          j <= i
            ? Math.min(
                Math.max(...values.slice(0, j + 1)),
                Math.max(...values.slice(j)),
              ) - v
            : 0,
        );
        frames.push(f);
      }
      frames.push(
        frame(
          "Add all column depths",
          values,
          [],
          `The total trapped water is ${total}. A high wall on only one side cannot trap water.`,
          `answer = ${total}`,
        ),
      );
      frames[frames.length - 1].water = frames[frames.length - 2].water;
      return frames;
    },
  },
  "lc-20": {
    title: "Valid Parentheses: the stack remembers nesting",
    cases: [
      { label: "Nested and balanced", text: "([])" },
      { label: "Wrong closing order", text: "([)]" },
      { label: "Unclosed opener", text: "(()" },
    ],
    trace({ text }) {
      const stack = [],
        frames = [
          frame(
            "Start with an empty stack",
            [...text],
            [],
            "The most recently opened bracket must close first.",
          ),
        ],
        pairs = { ")": "(", "]": "[", "}": "{" };
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if ("([{".includes(c)) {
          stack.push(c);
          frames.push(
            frame(
              `Push ${c}`,
              [...text],
              [i],
              "Opening brackets wait on the stack. The rightmost item below is the top.",
              `stack = ${stack.join(" ")}`,
            ),
          );
        } else {
          const got = stack.pop();
          const ok = got === pairs[c];
          frames.push(
            frame(
              ok ? `Match ${c}` : "Mismatch: stop",
              [...text],
              [i],
              ok
                ? `${c} closes ${got}, the most recent opener.`
                : `Expected ${pairs[c]} on top, but found ${got || "an empty stack"}. Counts alone cannot detect this error.`,
              `stack = ${stack.join(" ") || "empty"}${ok ? "" : "; return false"}`,
            ),
          );
          if (!ok) return frames;
        }
      }
      frames.push(
        frame(
          "End of input",
          [...text],
          [],
          stack.length
            ? "Some openers never closed. The string is invalid."
            : "Every opener has closed in the right order.",
          `return ${stack.length === 0}`,
        ),
      );
      return frames;
    },
  },
  "lc-704": {
    title: "Binary Search: shrink the possible range",
    cases: [
      { label: "Target present", values: [-1, 0, 3, 5, 9, 12], target: 9 },
      { label: "Target absent", values: [-1, 0, 3, 5, 9, 12], target: 2 },
    ],
    trace({ values, target }) {
      let l = 0,
        r = values.length - 1;
      const frames = [
        frame(
          "Sorted order lets us discard half",
          values,
          [],
          `Find ${target}. The candidate range initially contains the whole array.`,
        ),
      ];
      while (l <= r) {
        const m = l + Math.floor((r - l) / 2);
        frames.push(
          frame(
            `Inspect midpoint ${m}`,
            values,
            [m],
            values[m] === target
              ? `Found ${target}. Return index ${m}.`
              : values[m] < target
                ? `${values[m]} < ${target}. Everything at or left of midpoint is too small; move left to ${m + 1}.`
                : `${values[m]} > ${target}. Everything at or right of midpoint is too large; move right to ${m - 1}.`,
            `left = ${l}, mid = ${m}, right = ${r}`,
          ),
        );
        if (values[m] === target) return frames;
        if (values[m] < target) l = m + 1;
        else r = m - 1;
      }
      frames.push(
        frame(
          "The candidate range is empty",
          values,
          [],
          `No position can contain ${target}. Return −1.`,
          `left = ${l}, right = ${r}`,
        ),
      );
      return frames;
    },
  },
  "lc-121": {
    title: "Buy and Sell Stock: best earlier price",
    cases: [
      { label: "Profitable trade", values: [7, 1, 5, 3, 6, 4] },
      { label: "Falling prices", values: [7, 6, 4, 3, 1] },
    ],
    trace({ values }) {
      let low = Infinity,
        best = 0;
      return values.map((price, i) => {
        low = Math.min(low, price);
        best = Math.max(best, price - low);
        return frame(
          `Day ${i + 1}: price ${price}`,
          values,
          [i],
          `The cheapest price seen so far is ${low}. Selling today gives ${price - low}; retain the best profit seen on any day.`,
          `minimum = ${low}; best profit = ${best}`,
        );
      });
    },
  },
  "lc-70": {
    title: "Climbing Stairs: build answers from smaller answers",
    cases: [
      { label: "Four stairs", n: 4 },
      { label: "Six stairs", n: 6 },
      { label: "One stair", n: 1 },
    ],
    trace({ n }) {
      const dp = [1, 1],
        frames = [
          frame(
            "Base cases: 0 and 1 stairs",
            [1, 1],
            [0, 1],
            "There is one empty way to climb zero stairs, and one way to climb one stair. A final move is either one step or two steps.",
            "cells are ways[0], ways[1], …",
          ),
        ];
      for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        frames.push(
          frame(
            `Compute ways[${i}]`,
            dp.slice(),
            [i - 2, i - 1, i],
            `Finish with one step from ${i - 1} (${dp[i - 1]} ways), or two steps from ${i - 2} (${dp[i - 2]} ways). The two groups do not overlap.`,
            `${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
          ),
        );
      }
      frames.push(
        frame(
          "Read the requested answer",
          dp.slice(0, n + 1),
          [n],
          `There are ${dp[n]} ways to climb ${n} stairs. The Java implementation can retain just the last two values.`,
          `answer = ${dp[n]}`,
        ),
      );
      return frames;
    },
  },
  "lc-206": {
    title: "Reverse Linked List: redirect one arrow at a time",
    cases: [
      { label: "Three nodes", values: [1, 2, 3] },
      { label: "Single node", values: [7] },
      { label: "Four nodes", values: [2, 4, 6, 8] },
    ],
    trace({ values }) {
      const frames = [
        frame(
          "Original links",
          values,
          [],
          "Save the next node before changing a pointer, or you lose the rest of the list.",
          values.join(" → ") + " → null",
        ),
      ];
      let prev = "null";
      values.forEach((v, i) => {
        frames.push(
          frame(
            `Save next, then reverse node ${v}`,
            values,
            [i],
            `Remember next = ${values[i + 1] ?? "null"}. Change ${v}.next to ${prev}. Move prev to ${v}, then current to the saved next.`,
            `${values
              .slice(0, i + 1)
              .reverse()
              .join(
                " → ",
              )} → null | remaining: ${values.slice(i + 1).join(" → ") || "none"}`,
          ),
        );
        prev = v;
      });
      frames.push(
        frame(
          "Return the new head",
          values.slice().reverse(),
          [],
          "The old tail is now the head. No new nodes were needed.",
          values.slice().reverse().join(" → ") + " → null",
        ),
      );
      return frames;
    },
  },
  "lc-200": {
    title: "Number of Islands: flood one component at a time",
    cases: [
      {
        label: "Three islands",
        grid: [
          [1, 1, 0],
          [0, 1, 0],
          [1, 0, 1],
        ],
      },
      {
        label: "One connected island",
        grid: [
          [1, 0, 1],
          [1, 1, 1],
        ],
      },
    ],
    trace({ grid }) {
      const rows = grid.length,
        cols = grid[0].length,
        seen = new Set(),
        cells = grid.flat(),
        frames = [];
      let count = 0;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const id = r * cols + c;
          if (!grid[r][c] || seen.has(id)) continue;
          count++;
          const queue = [[r, c]];
          seen.add(id);
          frames.push({
            ...frame(
              `New island ${count}`,
              cells,
              [id],
              "This land has not been reached from an earlier island. Start a flood fill here.",
              `islands = ${count}`,
            ),
            cols,
          });
          while (queue.length) {
            const [x, y] = queue.shift();
            for (const [a, b] of [
              [x - 1, y],
              [x + 1, y],
              [x, y - 1],
              [x, y + 1],
            ])
              if (
                a >= 0 &&
                b >= 0 &&
                a < rows &&
                b < cols &&
                grid[a][b] &&
                !seen.has(a * cols + b)
              ) {
                seen.add(a * cols + b);
                queue.push([a, b]);
              }
            frames.push({
              ...frame(
                `Visit (${x}, ${y})`,
                cells,
                [...seen],
                "Visit only up/down/left/right land. Mark on discovery so a cell is never queued twice.",
                `islands = ${count}; queue = ${queue.map((p) => "(" + p.join(",") + ")").join(" ") || "empty"}`,
              ),
              cols,
            });
          }
        }
      frames.push({
        ...frame(
          "All land is accounted for",
          cells,
          [...seen],
          `Found ${count} disconnected islands. Diagonally touching land is not connected in this problem. This lab uses BFS; DFS explores in a different order but counts the same components.`,
          `answer = ${count}`,
        ),
        cols,
      });
      return frames;
    },
  },
};

Object.assign(labs, {
  "lc-3": {
    title: "Longest Substring: keep the window duplicate-free",
    cases: [
      { label: "Repeated letters", text: "abcabcbb" },
      { label: "One repeated letter", text: "bbbbb" },
      { label: "Jump past a duplicate", text: "abba" },
    ],
    trace({ text }) {
      const last = new Map(),
        frames = [];
      let left = 0,
        best = 0;
      for (let r = 0; r < text.length; r++) {
        const old = left;
        left = Math.max(left, (last.get(text[r]) ?? -1) + 1);
        last.set(text[r], r);
        best = Math.max(best, r - left + 1);
        frames.push(
          frame(
            `Read ${text[r]} at index ${r}`,
            [...text],
            Array.from({ length: r - left + 1 }, (_, i) => left + i),
            left > old
              ? `A duplicate forces the left boundary from ${old} to ${left}. The new window is “${text.slice(left, r + 1)}”.`
              : `“${text.slice(left, r + 1)}” contains no duplicate. Keep the left boundary at ${left}.`,
            `left = ${left}; right = ${r}; best length = ${best}`,
          ),
        );
      }
      return frames;
    },
  },
  "lc-53": {
    title: "Maximum Subarray: extend or start fresh",
    cases: [
      { label: "Mixed signs", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      { label: "All negative", values: [-3, -1, -2] },
    ],
    trace({ values }) {
      let ending = values[0],
        best = ending;
      const frames = [
        frame(
          "Start with the first value",
          values,
          [0],
          "The subarray must be nonempty. Starting best at zero would incorrectly win on all-negative input.",
          `best ending here = ${ending}; best overall = ${best}`,
        ),
      ];
      for (let i = 1; i < values.length; i++) {
        const extend = ending + values[i];
        ending = Math.max(values[i], extend);
        best = Math.max(best, ending);
        frames.push(
          frame(
            `At index ${i}: choose the better start`,
            values,
            [i],
            `Extend the previous subarray (${extend}), or start a new one (${values[i]}). Keep ${ending} as the best sum ending exactly here.`,
            `best ending here = ${ending}; best overall = ${best}`,
          ),
        );
      }
      return frames;
    },
  },
  "lc-322": {
    title: "Coin Change: build minimum counts by amount",
    cases: [
      { label: "Reachable amount", coins: [1, 3, 4], amount: 6 },
      { label: "Impossible amount", coins: [2], amount: 3 },
    ],
    trace({ coins, amount }) {
      const dp = Array(amount + 1).fill(Infinity);
      dp[0] = 0;
      const show = () => dp.map((x) => (x === Infinity ? "∞" : x));
      const frames = [
        frame(
          "Zero amount needs zero coins",
          show(),
          [0],
          `Allowed coins: ${coins.join(", ")}. Infinity means no known way to make that amount.`,
        ),
      ];
      for (let a = 1; a <= amount; a++) {
        const choices = [];
        for (const c of coins)
          if (c <= a && dp[a - c] !== Infinity) {
            dp[a] = Math.min(dp[a], dp[a - c] + 1);
            choices.push(`coin ${c}: dp[${a - c}] + 1 = ${dp[a - c] + 1}`);
          }
        frames.push(
          frame(
            `Minimum coins for amount ${a}`,
            show(),
            [a],
            choices.length
              ? choices.join("; ")
              : "No reachable smaller amount can lead here using one coin.",
            `dp[${a}] = ${dp[a] === Infinity ? "∞" : dp[a]}`,
          ),
        );
      }
      frames.push(
        frame(
          "Return the target state",
          show(),
          [amount],
          dp[amount] === Infinity
            ? "No combination reaches this amount; return −1."
            : `The fewest coins needed is ${dp[amount]}.`,
          `answer = ${dp[amount] === Infinity ? -1 : dp[amount]}`,
        ),
      );
      return frames;
    },
  },
  "lc-56": {
    title: "Merge Intervals: grow one overlapping group",
    cases: [
      {
        label: "Overlapping groups",
        values: [
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ],
      },
      {
        label: "Touching endpoints",
        values: [
          [1, 4],
          [4, 5],
        ],
      },
    ],
    trace({ values }) {
      const sorted = values.map((v) => v.slice()).sort((a, b) => a[0] - b[0]),
        result = [],
        cells = sorted.map((v) => `[${v}]`),
        frames = [
          frame(
            "Sort by start time",
            cells,
            [],
            "These intervals include their endpoints, so touching endpoints count as overlap.",
          ),
        ];
      sorted.forEach((v, i) => {
        const last = result.at(-1),
          overlap = last && v[0] <= last[1];
        if (overlap) last[1] = Math.max(last[1], v[1]);
        else result.push(v.slice());
        frames.push(
          frame(
            `Process [${v}]`,
            cells,
            [i],
            overlap
              ? "This interval starts before the current group ends. Extend the end only if necessary."
              : "There is no overlap with the previous group. Start a new output interval.",
            `result = ${JSON.stringify(result)}`,
          ),
        );
      });
      return frames;
    },
  },
});

// Pattern analogies teach transfer; they are not claims that every listed problem
// is used unchanged in a production system.
const patterns = [
  [
    /Binary search/i,
    "Narrow the search",
    "Keep a range that still contains every possible answer. Prove why a comparison lets you discard one side; a smaller range is useful only if you did not discard the answer.",
    "Finding the earliest software version with a regression: if the failure is monotonic, testing the middle version eliminates half the candidates.",
    "Candidate range → inspect midpoint → keep the possible half",
    "Why is the property you search monotonic? What happens at the boundary?",
  ],
  [
    /Sliding window/i,
    "Maintain a moving window",
    "Represent one contiguous range and update its state when a value enters or leaves. Decide exactly when the range is valid before updating the best answer.",
    "A service tracks activity in a moving time window. Adding new events and expiring old ones is the same incremental-state idea; real time-window rules differ from array indices.",
    "Extend right → update counts → shrink if needed → record answer",
    "Which fact becomes false when the window grows, and how does shrinking restore it?",
  ],
  [
    /Prefix/i,
    "Reuse the work before this position",
    "Store information about prefixes so a range or a missing portion can be answered without scanning it again. Define what each stored index includes to avoid off-by-one errors.",
    "A reporting dashboard uses cumulative totals to answer many date-range totals without rereading every daily record.",
    "Build prefix state → compare boundaries → answer range",
    "Does your prefix at i include element i, or stop just before it?",
  ],
  [
    /Two pointers|Reversal|Three-way/i,
    "Give each pointer a job",
    "Describe what each pointer marks and which region is already settled. Explain why moving that pointer cannot skip a valid answer. Some problems need sorted input; others do not.",
    "Comparing two ordered event streams uses two cursors: advance the stream with the earlier timestamp instead of restarting a search.",
    "Inspect boundaries → decide a move → shrink unsettled work",
    "What fact justifies each pointer move in this particular problem?",
  ],
  [
    /Hash|Frequency|Counting|Voting/i,
    "Remember just the useful information",
    "Use the problem’s required relationship to choose a key and value: membership, a count, an earlier index, or an aggregate. Decide whether to query before or after updating.",
    "Duplicate event detection stores event IDs already processed. Frequency-based tasks instead need counts; a set would lose that information.",
    "Read item → look up related state → update memory",
    "Why is this stored information sufficient, and why would less information fail?",
  ],
  [
    /Monotonic stack/i,
    "Keep unresolved candidates in order",
    "Each stack item waits for a future item that resolves it. When a new value breaks the order, pop the items it resolves. A popped item should never be needed again.",
    "Temperature alerts can ask how long each day waits for a warmer day. The unresolved days form a stack rather than a fresh forward scan for every day.",
    "Incoming value → resolve stack top(s) → push candidate",
    "What exact event resolves a waiting item, and why can it be discarded permanently?",
  ],
  [
    /Stack|Parsing/i,
    "Model last-in, first-out work",
    "A stack remembers work whose most recent unfinished part must be resolved first. State what one stack entry means; matching counts alone usually loses order.",
    "Nested expression parsing closes the innermost expression first. Undo systems similarly remember recent actions, though real undo may need richer state.",
    "Open or defer → push → resolve most recent → pop",
    "What does the top represent, and what must be true when input ends?",
  ],
  [
    /Heap/i,
    "Keep the next priority accessible",
    "Maintain a structure that exposes the smallest or largest relevant item. A heap does not fully sort all elements; it makes repeated priority selection efficient.",
    "A job scheduler repeatedly selects the highest-priority available task. Tie-breaking and changing priorities need additional rules in production.",
    "Insert candidate → inspect priority → remove or replace",
    "Why do you need only the heap top rather than a fully sorted collection?",
  ],
  [
    /Linked list/i,
    "Draw links before changing them",
    "A node is a value plus a reference. Save any reference that a pointer update would destroy, and handle head/tail/null explicitly. Trace a tiny list before generalizing.",
    "An LRU cache uses linked nodes to move a recently used item without shifting an entire array. Finding the node usually needs a separate map.",
    "Save needed links → reconnect nodes → advance safely",
    "Which node becomes unreachable if you change this link too early?",
  ],
  [
    /Trie/i,
    "Share common prefixes",
    "Follow one edge per symbol and share paths for common prefixes. Distinguish a complete word marker from merely reaching a valid prefix.",
    "Autocomplete can organize words by shared prefixes. Ranking suggestions and handling language normalization are extra concerns.",
    "Read symbol → follow/create edge → mark word boundary",
    "Can a prefix exist without being a complete stored word?",
  ],
  [
    /Binary tree/i,
    "Solve a subtree, then combine",
    "Define precisely what a recursive call returns for its subtree. Choose traversal order from the information the parent needs and handle an empty subtree first.",
    "Folder hierarchies are tree-like: computing a folder’s total size combines results from child folders. Symbolic links may turn a real filesystem into a graph.",
    "Base case → solve children → combine at parent",
    "What does the parent need back, and is that the same as the final answer?",
  ],
  [
    /Topological|DAG/i,
    "Respect prerequisites",
    "Model dependencies as directed edges. Make a node available only after its prerequisites are satisfied, or use traversal states to detect dependency cycles.",
    "A build system must compile dependencies before the target that uses them. A cycle explains why a valid ordering may not exist.",
    "Track prerequisites → process available nodes → unlock dependents",
    "What would a cycle mean, and how do you know every node was processed?",
  ],
  [
    /Dijkstra|Weighted|Bellman|spanning|Minimax/i,
    "Define what a path costs",
    "Model vertices, edges and the quantity being optimized before choosing traversal. FIFO breadth-first search is not a general weighted shortest-path algorithm.",
    "Routing can minimize travel cost across connected locations. Negative weights, changing traffic and route constraints require different assumptions.",
    "Candidate cost → compare improvement → propagate",
    "Are you adding edge costs, taking a maximum, or connecting the whole graph?",
  ],
  [
    /Graph|Flood|Reachability/i,
    "Visit a connected state space",
    "Define neighbors, visited state and what a frontier entry means. Mark visited at the correct moment so cycles do not cause repeated work. BFS layers give shortest edge counts only for suitable unweighted graphs.",
    "Network reachability asks which machines can be contacted through available links. A visited set prevents cycling between the same machines.",
    "Choose start → expand neighbors → track visited → finish frontier",
    "What makes two states identical, and when should a state be marked visited?",
  ],
  [
    /Backtracking/i,
    "Choose, explore, undo",
    "Maintain a partial answer. Try one legal choice, recurse, then undo it before trying a sibling choice. Pruning needs proof that the discarded branch cannot succeed.",
    "A small scheduling puzzle tries assignments subject to constraints. Early conflict checks prune invalid partial schedules. Large real schedules may need stronger solvers.",
    "Choose → explore → undo → next choice",
    "Which state must be restored so the next branch starts cleanly?",
  ],
  [
    /Dynamic programming/i,
    "Give each smaller answer a meaning",
    "Define a state in a full sentence, specify the base cases, then connect it to smaller states. Compute in an order where every dependency already exists. Avoid memorizing a recurrence without its meaning.",
    "A budget planner can compare taking or skipping items under a capacity limit. Different rules—reusable items or multiple budgets—change the state and transitions.",
    "Define state → base cases → transition → answer",
    "Why do the cases cover every possibility without missing or double-counting answers?",
  ],
  [
    /Bit manipulation/i,
    "Reason about one bit at a time",
    "Translate the operation into a per-bit rule and identify how bits combine. Distinguish signed Java integers from mathematical integers and consider fixed-width overflow.",
    "Permission flags encode independent yes/no capabilities as bits. A mask tests or changes selected flags while leaving others intact.",
    "Write binary form → apply bit rule → combine result",
    "What happens to the sign bit and to zero in Java’s fixed-width representation?",
  ],
  [
    /Intervals/i,
    "Make overlap explicit",
    "Write the interval boundary convention first. Sorting by a useful endpoint often turns many pair comparisons into one scan, but the correct sort key depends on the objective.",
    "Calendar booking detects overlapping reservations. Touching endpoints may be allowed or rejected depending on whether time ranges are half-open or closed.",
    "Order endpoints → compare overlap → merge or choose",
    "Do touching endpoints overlap under this problem’s rules?",
  ],
  [
    /Greedy/i,
    "Prove the local choice is safe",
    "Name the local choice and show how an optimal solution can be adjusted to include it without getting worse. A choice that looks good is not automatically globally optimal.",
    "Selecting non-overlapping activities can use a carefully justified endpoint rule. Changing the objective to weighted value can invalidate that greedy rule.",
    "Choose locally → justify exchange → continue",
    "Can you exchange your choice into an optimal solution without reducing its value?",
  ],
  [
    /Matrix|Grid/i,
    "Track coordinates and boundaries",
    "Define row/column meanings, valid movements and which cells are already processed. Use a tiny rectangular example rather than only square grids to expose dimension mistakes.",
    "Image processing applies operations to pixel grids. Neighbor definitions and image borders determine which values are read or updated.",
    "Locate cell → check boundaries → update or visit",
    "What changes at the first/last row or column, and is input overwritten?",
  ],
  [
    /.*/,
    "Write the invariant before the loop",
    "Start from a concrete example, identify what information must survive each step, then explain why the next step preserves it. Check the smallest valid input separately.",
    "Batch-processing systems repeatedly transform state while preserving an invariant, such as a running total. This is a transfer analogy, not a claim that the exact puzzle is a production system.",
    "Initial state → justified transformation → result",
    "What remains true after every iteration, and why does termination give the answer?",
  ],
];

export function patternFor(q) {
  return patterns.find((p) => p[0].test(q.tags || ""));
}
function labBody(id, caseIndex = 0, index = 0) {
  const lab = labs[id],
    frames = lab.trace(lab.cases[caseIndex]);
  index = Math.max(0, Math.min(index, frames.length - 1));
  const f = frames[index];
  return `<div class="lab-controls"><label>Example<select data-lab-case>${lab.cases.map((c, i) => `<option value="${i}" ${caseIndex === i ? "selected" : ""}>${esc(c.label)}</option>`).join("")}</select></label><span class="small muted">Step ${index + 1} / ${frames.length}</span></div><div class="lab-diagram ${f.cols ? "lab-grid" : ""}" ${f.cols ? `style="grid-template-columns:repeat(${f.cols},minmax(0,1fr))"` : ""} role="img" aria-label="${esc(f.title + "; " + f.cells.map((v, i) => `position ${i}: ${v}${f.active.includes(i) ? " highlighted" : ""}`).join(", "))}">${f.cells.map((v, i) => `<div class="lab-cell ${f.active.includes(i) ? "lab-active" : ""}"><small>${f.cols ? `${Math.floor(i / f.cols)},${i % f.cols}` : i}</small><strong>${esc(v)}</strong>${f.water ? `<span class="column-model"><span class="water-block" style="height:${f.water[i] * 12}px"></span><span class="height-block" style="height:${Number(v) * 12}px"></span></span><span class="water-depth">+${f.water[i]} water</span>` : ""}</div>`).join("")}</div><div class="lab-caption" aria-live="polite"><h4>${esc(f.title)}</h4><p>${esc(f.explanation)}</p>${f.state ? `<pre class="lab-state">${esc(f.state)}</pre>` : ""}</div><div class="actions"><button type="button" data-lab-step="0">Restart</button><button type="button" data-lab-step="${index - 1}" ${index === 0 ? "disabled" : ""}>Previous step</button><button type="button" class="primary" data-lab-step="${index + 1}" ${index === frames.length - 1 ? "disabled" : ""}>Next step</button></div>`;
}
const intuition = {
  "lc-1": [
    "Trying every pair repeats work. Instead, ask what one value would complete the current value to the target. Remember earlier values so each partner lookup is direct. Lookup before insertion prevents a number from pairing with itself.",
    "Reconciling two expense entries against a known total uses the same complement idea. For money, use integer cents and define how duplicate entries are handled.",
  ],
  "lc-42": [
    "Imagine pouring water onto the bars. A column leaks toward the shorter surrounding wall, so its depth is min(left maximum, right maximum) minus its height. The two-pointer solution finalizes the side whose boundary is already sufficient, avoiding a separate maximum array.",
    "This is a simplified cross-section of terrain water retention. Real drainage models also require slopes, outlets, permeability and two-dimensional terrain.",
  ],
  "lc-20": [
    "Counting open and closed brackets is insufficient: ([)] has matching counts but incorrect nesting. The last opener must close first, which is exactly the rule a stack enforces. A leftover opener also makes the string invalid.",
    "Editors use related nesting checks to flag mismatched brackets. A real language parser also accounts for strings, comments and grammar.",
  ],
  "lc-704": [
    "A linear scan ignores the sorted order. Compare with the middle: if it is too small, every item to its left is also too small. Discard that entire half. Keep updating inclusive boundaries until they cross or the target is found.",
    "Searching a sorted in-memory index can skip half the candidates at each comparison. Database indexes often use trees so storage access is efficient too.",
  ],
  "lc-121": [
    "For each possible selling day, only the cheapest earlier buying price matters. Carry that minimum forward and compare today's profit with the best so far. Buying after selling is never a valid candidate; falling prices yield zero profit when no trade is required.",
    "Historical price analysis can compute the best single buy/sell interval. This hindsight calculation is not a prediction or a trading strategy.",
  ],
  "lc-70": [
    "To arrive at step n, the final move came from n-1 or n-2. Those possibilities are disjoint, so add their counts. Start with one way to remain at step zero, then build larger answers. Only the previous two counts are needed for the optimized solution.",
    "Counting ways to complete a workflow using actions of length one or two has the same recurrence. Adding other action lengths changes the transitions.",
  ],
  "lc-206": [
    "Reversing an arrow can disconnect the rest of the list. Save the next node first, point the current node backward, then advance. At every stage the reversed prefix and untouched suffix together still contain every original node.",
    "Reversing a chain of records uses the same pointer discipline. Production code must also consider concurrent readers and whether modifying the original chain is allowed.",
  ],
  "lc-200": [
    "Counting land cells overcounts islands. When a new land cell is found, count one island and visit its whole connected component before scanning again. Mark cells when adding them to the queue so shared neighbors are not added repeatedly. The demo tracks visits separately; the Java implementation marks the grid itself.",
    "Grouping connected pixels into regions is a related image-processing task. Diagonal connectivity would produce different groups from this problem's four-direction rule.",
  ],
  "lc-3": [
    "Restarting at every character rechecks many substrings. Maintain a window with no duplicates. When a repeated character lies inside it, move the left boundary just past its earlier position. Never move left backward: the abba example exposes that mistake.",
    "Finding a contiguous sequence of distinct event types uses the same window rule. Real text may require Unicode code points or grapheme clusters rather than Java char units.",
  ],
  "lc-53": [
    "For the best subarray ending here, there are only two choices: extend the previous best ending sum, or start fresh at this element. A negative prefix only makes a future sum worse. Track the global best separately, and initialize from a real element so all-negative inputs work.",
    "Finding the strongest contiguous period in a series of daily gains and losses uses this idea. The result depends on whether an empty period is allowed.",
  ],
  "lc-322": [
    "Greedy largest-coin-first fails for coins [1,3,4] and amount 6: 4+1+1 needs three coins but 3+3 needs two. Let dp[a] mean the fewest coins for amount a. Try each possible final coin, using already solved smaller amounts; unreachable states must remain unreachable.",
    "A dispenser with unlimited denominations can minimize the number of tokens returned. Limited inventory requires a different state or transition rule.",
  ],
  "lc-56": [
    "Without sorting, overlapping ranges can appear far apart. Sort by start, then compare each range with the last merged range. If they overlap, extend the end using the maximum; otherwise begin a new group. These closed intervals also merge when endpoints touch.",
    "Combining overlapping maintenance windows uses interval merging. Calendar systems often use half-open intervals, where touching bookings need not overlap.",
  ],
};

export function renderLesson(q) {
  const [, title, reason, use, flow, check] = patternFor(q),
    steps = (q.solution || "").split(/(?<=[.!?])\s+/).filter(Boolean);
  return `<section class="learning-guide"><div class="eyebrow">VISUAL LEARNING GUIDE</div><h3>${esc(title)}</h3><p>${esc(reason)}</p>${intuition[q.id] ? `<h4>Why this approach works</h4><p>${esc(intuition[q.id][0])}</p>` : ""}<h4>The task in plain language</h4><p>${esc(q.context)}</p><div class="lesson-example"><h4>Concrete example</h4><p class="prose">${esc(q.examples)}</p></div>${labs[q.id] ? `<section class="algorithm-lab" data-lab="${esc(q.id)}" data-case="0"><h4>${esc(labs[q.id].title)}</h4><p class="small muted">Use the controls to inspect state changes. Switching examples does not change your practice data.</p><div data-lab-body>${labBody(q.id)}</div></section>` : ""}<h4>Pattern map</h4><ol class="pattern-flow" aria-label="Pattern reasoning diagram">${flow
    .split(" → ")
    .map((s) => `<li>${esc(s)}</li>`)
    .join(
      "",
    )}</ol><p class="small muted">This map illustrates the pattern. The exact decisions for this question are below.</p><h4>Walk through this solution</h4><ol class="reasoning-steps">${steps.map((s, i) => `<li><strong>Step ${i + 1}</strong><p>${esc(s)}</p></li>`).join("")}</ol><details class="lesson-check"><summary>Pause and predict: what must remain true?</summary><p>${esc(check)}</p><p><strong>Connect it to this problem:</strong> ${esc(q.solution)}</p></details><h4>Where this idea is useful</h4><p>${esc(intuition[q.id]?.[1] || use)}</p><p class="small muted">Illustrative use case for the pattern; production requirements can be different.</p><div class="lesson-cost"><div><strong>Time</strong><p>${esc(q.timeComplexity)}</p></div><div><strong>Extra space</strong><p>${esc(q.spaceComplexity)}</p></div></div><details class="lesson-check"><summary>Check the common mistake</summary><p>${esc(q.pitfall)}</p></details><details class="lesson-check"><summary>Try the interview follow-up</summary><p>${esc(q.followUp)}</p><p class="small muted">Explain what assumption changes, then reconsider the data structure, invariant and complexity.</p></details></section>`;
}
export function installLessonInteractions(root = document) {
  root.addEventListener("click", (e) => {
    const button = e.target.closest("[data-lab-step]");
    if (!button) return;
    e.preventDefault();
    const lab = button.closest("[data-lab]");
    lab.querySelector("[data-lab-body]").innerHTML = labBody(
      lab.dataset.lab,
      Number(lab.dataset.case),
      Number(button.dataset.labStep),
    );
    const next =
      [...lab.querySelectorAll("[data-lab-step]:not([disabled])")].find(
        (candidate) => candidate.textContent === button.textContent,
      ) || lab.querySelector("[data-lab-step]:not([disabled])");
    next?.focus({ preventScroll: true });
  });
  root.addEventListener("change", (e) => {
    if (!e.target.matches("[data-lab-case]")) return;
    const lab = e.target.closest("[data-lab]");
    lab.dataset.case = e.target.value;
    lab.querySelector("[data-lab-body]").innerHTML = labBody(
      lab.dataset.lab,
      Number(lab.dataset.case),
    );
    lab.querySelector("[data-lab-case]").focus({ preventScroll: true });
  });
}
