# Structures catalog research and verification

Reviewed on 2026-10-20. This module contributes 83 questions and 332 recall cards: 27 linked-list questions, 21 stack/queue questions, 10 heap/frequency questions, and 25 tree/BST/trie questions. These are curriculum selections for pattern coverage, not a claim of measured interview frequency or a company-specific ranking.

## Selection and teaching method

The official [Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) and [LeetCode 75](https://leetcode.com/studyplan/leetcode-75/) study-plan pages describe broad interview preparation sets. They serve as curriculum anchors, not evidence that every question in this module belongs to both plans. Each entry links to its official practice page. No paid editorial or company-frequency data was reproduced.

Each question has an original concise input/output contract, small trace, algorithm invariant, time/space bounds, implementation pitfall, extension prompt, complete Java implementation, and four independently reviewable cards. The code is written for this project rather than copied from an editorial. The context is a learning summary, not a replacement for all numeric limits on the official problem page.

Suggested progression: pointer rewiring and dummy heads; two-pointer identity reasoning; stack parsing; monotonic unresolved-frontier problems; heap selection and streams; traversal order and breadth-first levels; subtree invariants; trie exact versus prefix matching. Difficult examples such as k-group reversal, histogram rectangles, maximum path sum, and frequency stacks should follow their simpler prerequisite patterns.

Specific distinctions intentionally taught include duplicate-value versus node identity, keeping one duplicate versus removing an entire repeated run, valid leaves versus missing children, tree height versus width memory, inherited BST bounds, one-branch return values versus two-branch complete paths, amortized versus worst-case operation costs, and overflow-safe heap comparisons.

## Pages actually opened in this research pass

The two study plans above and the following official pages were opened. This is a representative live verification pass; it is not a claim that all 83 individual statements were re-fetched. All entries carry individual official problem links for continued practice.

- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/): empty input, reversal contract, iterative/recursive extension.
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/): per-level left-to-right output.
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/): strictly warmer, distance rather than next value.
- [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/): nonempty median queries and range-based follow-up.
- [Implement Trie](https://leetcode.com/problems/implement-trie-prefix-tree/): exact word versus prefix; lowercase alphabet.
- [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/): deep-copy identity and internal random links.
- [Maximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack/): maximum frequency with most-recent tie break.
- [Design Linked List](https://leetcode.com/problems/design-linked-list/): zero-based indices, invalid get, valid insertion at size, no built-in linked-list implementation.
- [Flatten a Multilevel Doubly Linked List](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/): child-first order, cleared child pointers.
- [Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/): remove every member of repeated runs.
- [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/): valid n and one-pass follow-up.
- [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/): incomplete final groups unchanged, link mutation rather than value replacement.
- [Sort List](https://leetcode.com/problems/sort-list/): merge-sort interview baseline and constant-space extension.
- [Task Scheduler](https://leetcode.com/problems/task-scheduler/): cooldown scheduling contract.
- [Path Sum II](https://leetcode.com/problems/path-sum-ii/): root-to-leaf result paths.
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/): strict descendant inequalities, int boundary values.
- [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/): nonempty paths, no repeated nodes, paths need not use root.
- [Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/): preorder right-pointer chain and constant-space follow-up.
- [Populating Next Right Pointers II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/): arbitrary shape and initially null next links.
- [Design Add and Search Words](https://leetcode.com/problems/design-add-and-search-words-data-structure/): dot matches one letter; current official search constraints permit at most two dots, although the implementation handles more.
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/): unit bar widths and contiguous rectangle area.
- [Decode String](https://leetcode.com/problems/decode-string/): nested repetition contract.
- [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/): rank counts duplicate positions.
- [Oracle Java 25 PriorityQueue](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/PriorityQueue.html): heap queue API and operation complexity.
- [Oracle Java 25 ArrayDeque](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ArrayDeque.html): stack/deque API used in implementations.

## Validation scope

Every entry includes at least two executable Java assertions. Additional checks cover positive cycles, cycle-entry identity, shared-tail intersection, restoring a palindrome list, odd-length reorder, incomplete reverse groups, stateful indexed list edits, and odd stream medians. All node classes needed by the solutions are included in the full code; LeetCode itself normally supplies those node definitions, so omit duplicate helper definitions when pasting into its editor.

On 2026-10-20, all 83 standalone Java programs compiled and passed their initial two cases under OpenJDK 25.0.2. The eight programs with supplemental checks were then re-run and all eight passed with those checks included.

These local checks are a smoke/regression baseline, not an exhaustive proof, hidden-test result, or evidence of a LeetCode submission. Recursive tree implementations use O(h) stack and can require iterative conversion for exceptionally deep trees or restrictive runtime stacks. Output-space exclusions are explicitly identified. The sort-list baseline is top-down O(log n) auxiliary space, with bottom-up constant-space sorting left as an extension. Decode-string complexity accounts for expanded intermediate strings rather than claiming input-length-only time.
