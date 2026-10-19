# Graph, backtracking, DP and bit-manipulation research

Research date: 2026-10-20 (Asia/Calcutta).

## Selection and provenance

This module contains 83 distinct problems: 28 graph/grid problems, 13 backtracking problems, 33 dynamic-programming/palindrome problems and 9 math/bit problems. These are a pattern-coverage curriculum, not a statistical claim about company interview frequency. The official [Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) and [LeetCode 75](https://leetcode.com/studyplan/leetcode-75/) pages were opened as curriculum references; the module is not represented as an exact copy of either list.

All 83 official public problem-description URLs listed below were opened with the web browsing tool during authoring. The browser returned public descriptions, difficulty labels, examples and/or constraint sections; long batched results sometimes exposed only page metadata after the initial pages. Contracts with important traps were read in detail, including Course Schedule, Evaluate Division, Cheapest Flights, Word Ladder, Combination Sum II, Word Search, Decode Ways, Interleaving String, Maximum Product Subarray and the fixed-width bit problems. No paid editorials or company-frequency data were accessed.

The summaries, short teaching examples, algorithm explanations, pitfalls, follow-ups, recall cards and Java implementations were authored for this app. These are condensed learning notes; the linked official problem remains the full statement and submission destination. Each question has four cards on the invariant, a specific trap, complexity and a concrete trace. Solutions and notes should stay hidden until the learner asks to inspect them.

## Teaching choices

- Separate reachability, unweighted shortest paths, nonnegative weighted shortest paths, bounded-edge paths and minimum spanning trees; similar graph vocabulary does not make their objectives interchangeable.
- Contrast backtracking duplicate rules at the same depth with reuse rules across depths. Include empty results, impossible states and mutable-path restoration.
- Make DP state meanings explicit before the recurrence. Contrast ascending unbounded-knapsack updates with descending 0/1 updates; distinguish counting sequences from counting combinations.
- Explain the proof or invariant and one next-step interview variant for every question. Full Java code is complete and includes imports and any required graph node type.
- Prefer clear reference solutions where appropriate: Longest Increasing Subsequence uses quadratic DP and offers minimum-tail optimization as a follow-up; Longest Palindromic Substring uses interval DP and offers center expansion as a follow-up. These are deliberately stated complexity tradeoffs.
- Public Reverse Bits currently restricts inputs to nonnegative even values. The note records that current contract and distinguishes the routine's broader 32-bit handling.

## Validation

All 83 Java solutions compiled under the installed Eclipse Adoptium JDK 25.0.2 and passed every embedded test case on 2026-10-20. Each test body contains at least two concrete cases/assertions; some add further edge cases. For one combined temporary harness, class Solution was renamed per question and test references were changed consistently. Clone Graph includes its own Node definition; no external harness helpers are required. Final displayed Java was recompiled after formatting. This is local smoke/regression coverage, not proof against every valid input or a claim of LeetCode judge acceptance.

The source export was checked to contain exactly 83 unique numeric IDs. It supplies sourceUrl separately from the slug. Test snippets are developer validation material and need not be shown in the student flow.

## Official problem pages opened

- 200. [Number of Islands](https://leetcode.com/problems/number-of-islands/description/)
- 133. [Clone Graph](https://leetcode.com/problems/clone-graph/description/)
- 207. [Course Schedule](https://leetcode.com/problems/course-schedule/description/)
- 210. [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/description/)
- 130. [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/description/)
- 399. [Evaluate Division](https://leetcode.com/problems/evaluate-division/description/)
- 547. [Number of Provinces](https://leetcode.com/problems/number-of-provinces/description/)
- 841. [Keys and Rooms](https://leetcode.com/problems/keys-and-rooms/description/)
- 994. [Rotting Oranges](https://leetcode.com/problems/rotting-oranges/description/)
- 433. [Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/description/)
- 127. [Word Ladder](https://leetcode.com/problems/word-ladder/description/)
- 909. [Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders/description/)
- 752. [Open the Lock](https://leetcode.com/problems/open-the-lock/description/)
- 785. [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/description/)
- 886. [Possible Bipartition](https://leetcode.com/problems/possible-bipartition/description/)
- 684. [Redundant Connection](https://leetcode.com/problems/redundant-connection/description/)
- 1319. [Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/description/)
- 721. [Accounts Merge](https://leetcode.com/problems/accounts-merge/description/)
- 743. [Network Delay Time](https://leetcode.com/problems/network-delay-time/description/)
- 787. [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/description/)
- 1584. [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/description/)
- 1631. [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/description/)
- 797. [All Paths From Source to Target](https://leetcode.com/problems/all-paths-from-source-to-target/description/)
- 1091. [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix/description/)
- 1926. [Nearest Exit from Entrance in Maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/)
- 417. [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/description/)
- 695. [Max Area of Island](https://leetcode.com/problems/max-area-of-island/description/)
- 463. [Island Perimeter](https://leetcode.com/problems/island-perimeter/description/)
- 17. [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)
- 39. [Combination Sum](https://leetcode.com/problems/combination-sum/description/)
- 40. [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/description/)
- 46. [Permutations](https://leetcode.com/problems/permutations/description/)
- 47. [Permutations II](https://leetcode.com/problems/permutations-ii/description/)
- 77. [Combinations](https://leetcode.com/problems/combinations/description/)
- 78. [Subsets](https://leetcode.com/problems/subsets/description/)
- 90. [Subsets II](https://leetcode.com/problems/subsets-ii/description/)
- 79. [Word Search](https://leetcode.com/problems/word-search/description/)
- 131. [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/description/)
- 51. [N-Queens](https://leetcode.com/problems/nqueens/description/)
- 52. [N-Queens II](https://leetcode.com/problems/nqueens-ii/description/)
- 216. [Combination Sum III](https://leetcode.com/problems/combination-sum-iii/description/)
- 70. [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/description/)
- 198. [House Robber](https://leetcode.com/problems/house-robber/description/)
- 213. [House Robber II](https://leetcode.com/problems/house-robber-ii/description/)
- 322. [Coin Change](https://leetcode.com/problems/coin-change/description/)
- 518. [Coin Change II](https://leetcode.com/problems/coin-change-ii/description/)
- 300. [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/description/)
- 1143. [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/description/)
- 72. [Edit Distance](https://leetcode.com/problems/edit-distance/description/)
- 139. [Word Break](https://leetcode.com/problems/word-break/description/)
- 416. [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/description/)
- 494. [Target Sum](https://leetcode.com/problems/target-sum/description/)
- 62. [Unique Paths](https://leetcode.com/problems/unique-paths/description/)
- 63. [Unique Paths II](https://leetcode.com/problems/unique-paths-ii/description/)
- 64. [Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/description/)
- 120. [Triangle](https://leetcode.com/problems/triangle/description/)
- 221. [Maximal Square](https://leetcode.com/problems/maximal-square/description/)
- 152. [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/description/)
- 91. [Decode Ways](https://leetcode.com/problems/decode-ways/description/)
- 5. [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/description/)
- 647. [Palindromic Substrings](https://leetcode.com/problems/palindromic-substrings/description/)
- 97. [Interleaving String](https://leetcode.com/problems/interleaving-string/description/)
- 115. [Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/description/)
- 312. [Burst Balloons](https://leetcode.com/problems/burst-balloons/description/)
- 309. [Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/)
- 714. [Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/)
- 123. [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/)
- 188. [Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/)
- 746. [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/description/)
- 1137. [N-th Tribonacci Number](https://leetcode.com/problems/nth-tribonacci-number/description/)
- 790. [Domino and Tromino Tiling](https://leetcode.com/problems/domino-and-tromino-tiling/description/)
- 1043. [Partition Array for Maximum Sum](https://leetcode.com/problems/partition-array-for-maximum-sum/description/)
- 474. [Ones and Zeroes](https://leetcode.com/problems/ones-and-zeroes/description/)
- 279. [Perfect Squares](https://leetcode.com/problems/perfect-squares/description/)
- 136. [Single Number](https://leetcode.com/problems/single-number/description/)
- 137. [Single Number II](https://leetcode.com/problems/single-number-ii/description/)
- 260. [Single Number III](https://leetcode.com/problems/single-number-iii/description/)
- 191. [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/description/)
- 190. [Reverse Bits](https://leetcode.com/problems/reverse-bits/description/)
- 338. [Counting Bits](https://leetcode.com/problems/counting-bits/description/)
- 201. [Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range/description/)
- 50. [Pow(x, n)](https://leetcode.com/problems/powx-n/description/)
- 202. [Happy Number](https://leetcode.com/problems/happy-number/description/)
