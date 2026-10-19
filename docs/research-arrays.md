# Arrays, strings, searching, intervals, and greedy catalog research

Research date: 2026-10-20 (Asia/Calcutta).

## Selection and authorship

This shard contains exactly **84 distinct public LeetCode exercise IDs**, each with an original summary, illustrative example, Java implementation, correctness invariant, complexity analysis, pitfall, follow-up question, and three recall cards. The selection balances foundational problems and variations that expose an assumption change: distinct versus duplicate rotated arrays, positive versus signed subarray sums, interval union versus scheduling, one versus unlimited stock transactions, and feasibility versus optimization. It is an editorial curriculum selection, **not a measured ranking of company interview frequency**.

The official [Top Interview 150 study plan](https://leetcode.com/studyplan/top-interview-150/) was visited. Its public description identifies a broad classic-question curriculum and a three-month preparation horizon. Its problem membership list was not available in the fetched text, so this document does not claim these 84 are all members. The [problemset page](https://leetcode.com/problemset/) was also opened, but returned no usable text.

All explanations and code were authored for this application; no paid editorial, full problem statement, image, or company-frequency table was copied. Each catalog record links directly to its official exercise. Short summaries intentionally emphasize inputs, outputs, and algorithm-critical assumptions rather than reproduce every numerical constraint. Original examples were chosen separately from official examples where practical.

## Official problem pages actually inspected

The following **13** problem descriptions were successfully fetched and read, including their visible constraints and difficulty, to anchor representative patterns and critical assumptions:

| Page | Research use |
| --- | --- |
| [Two Sum](https://leetcode.com/problems/two-sum/) | Distinct indices, exactly one solution, hash-map baseline |
| [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | Multiplicity-sensitive coverage and English-letter alphabet |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | No division, linear time, prefix/suffix integer guarantees |
| [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) | Unsorted input, duplicate handling, expected linear approach |
| [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Signed inputs and counting nonempty contiguous intervals |
| [3Sum](https://leetcode.com/problems/3sum/) | Unique value triples versus distinct indices |
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Unit-width nonnegative heights and bounded total |
| [Binary Search](https://leetcode.com/problems/binary-search/) | Sorted distinct input and logarithmic requirement |
| [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | Per-pile ceiling hours, h>=number of piles, large sums |
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Closed endpoints: touching intervals merge |
| [Jump Game II](https://leetcode.com/problems/jump-game-ii/) | Reachability guarantee and minimum-jump objective |
| [Candy](https://leetcode.com/problems/candy/) | Strict neighbor-rating inequalities and minimum total |
| [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Empty individual arrays allowed, combined input nonempty, logarithmic target |

The remaining **71** exercise links identify the intended official problems but were **not individually fetched in this research pass**. Their content was authored from algorithm knowledge and validated locally; do not describe this shard as 84 individually researched pages. An attempted fetch of Find the Duplicate Number timed out; that exercise is not in this shard and provided no evidence.

## Validation evidence

All 84 Java solutions were compiled together as isolated nested classes using installed OpenJDK javac 25.0.2. Their per-record testCode statements ran successfully: **84 solutions, 168 cases**, including duplicates, missing answers, empty supported inputs, overflow-sensitive comparisons, zero products, equal endpoints, and single-element boundaries. The runner renamed Solution to a unique class per question; no algorithm body was changed. Tests ran on 2026-10-20. This is local example and edge-case validation, not a claim of official LeetCode submission acceptance or exhaustive proof.

No ListNode or TreeNode helper is required. For exercises 303 and 304, the self-contained Java class and constructor use Solution to fit the catalog harness; their context explicitly instructs renaming these to NumArray and NumMatrix, respectively, when submitting to LeetCode. Other snippets use LeetCode-compatible Solution method signatures.

Each record has exactly three cards: correctness/key insight, a concrete implementation pitfall, and implementation complexity. Follow-up questions remain in the question context as open exercises; they are not presented as answered flashcards. This avoids teaching a generic non-answer as a follow-up solution.

## Scope

IDs: 1, 217, 242, 49, 238, 128, 36, 303, 304, 560, 525, 724, 205, 290, 383, 387, 169, 229, 27, 26, 80, 283, 88, 189, 75, 31, 125, 680, 167, 15, 16, 18, 11, 42, 977, 344, 345, 443, 3, 76, 424, 567, 438, 209, 713, 1004, 904, 1456, 643, 704, 35, 34, 33, 81, 153, 154, 162, 852, 74, 240, 875, 1011, 1482, 1552, 4, 56, 57, 435, 452, 986, 228, 121, 122, 55, 45, 134, 135, 455, 406, 763, 881, 179, 274, 334.
