// Original curated study guides; source provenance is in docs/research-arrays.md
export default [
  {
    "id": "lc-1",
    "number": 1,
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "Easy",
    "tags": "Array, Hash map",
    "url": "https://leetcode.com/problems/two-sum/",
    "context": "Input: at least two integers and a target. Return two distinct indices whose values sum to the target. Exactly one pair exists; duplicates and negative values are allowed.",
    "examples": "[4,9,6], target 10 → [0,2]. At 6, the complement 4 is already stored.",
    "solution": "Scan left to right with a map from value to an earlier index. Before inserting x, look for target-x. The map contains only earlier elements, so any match uses two distinct indices.",
    "timeComplexity": "O(n) expected",
    "spaceComplexity": "O(n)",
    "pitfall": "Look up before inserting: target 8 with a single 4 must not match its own index. Two different 4s are valid.",
    "followUp": "How would the solution change if the array were sorted and extra space had to be constant?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> seen = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            Integer j = seen.get(target - nums[i]);\n            if (j != null) return new int[] { j, i };\n            seen.put(nums[i], i);\n        }\n        throw new IllegalArgumentException(\"No pair\");\n    }\n}\n",
    "testCode": "Solution s=new Solution(); if(!Arrays.equals(s.twoSum(new int[]{4,9,6},10),new int[]{0,2}))throw new AssertionError(); if(!Arrays.equals(s.twoSum(new int[]{4,4},8),new int[]{0,1}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Two Sum: what invariant or exchange argument makes the solution correct?",
        "back": "Scan left to right with a map from value to an earlier index. Before inserting x, look for target-x. The map contains only earlier elements, so any match uses two distinct indices."
      },
      {
        "type": "Edge case",
        "front": "Two Sum: what implementation trap should you check before submitting?",
        "back": "Look up before inserting: target 8 with a single 4 must not match its own index. Two different 4s are valid."
      },
      {
        "type": "Complexity",
        "front": "Two Sum: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) expected. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-217",
    "number": 217,
    "title": "Contains Duplicate",
    "slug": "contains-duplicate",
    "difficulty": "Easy",
    "tags": "Array, Hash set",
    "url": "https://leetcode.com/problems/contains-duplicate/",
    "context": "Input: an integer array. Return true when any value appears at least twice, otherwise false. Equal values at different indices count as duplicates.",
    "examples": "[8,3,8] → true; [8,3,1] → false.",
    "solution": "Insert values into a set. A failed insertion proves the current value was already encountered. If all insertions succeed, every input value is distinct.",
    "timeComplexity": "O(n) expected",
    "spaceComplexity": "O(n)",
    "pitfall": "A set detects duplicates; comparing only neighboring elements works only after sorting.",
    "followUp": "How would sorting trade memory for time?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int x : nums) if (!seen.add(x)) return true;\n        return false;\n    }\n}\n",
    "testCode": "Solution s=new Solution(); if(!s.containsDuplicate(new int[]{8,3,8}))throw new AssertionError(); if(s.containsDuplicate(new int[]{8,3,1}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Contains Duplicate: what invariant or exchange argument makes the solution correct?",
        "back": "Insert values into a set. A failed insertion proves the current value was already encountered. If all insertions succeed, every input value is distinct."
      },
      {
        "type": "Edge case",
        "front": "Contains Duplicate: what implementation trap should you check before submitting?",
        "back": "A set detects duplicates; comparing only neighboring elements works only after sorting."
      },
      {
        "type": "Complexity",
        "front": "Contains Duplicate: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) expected. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-242",
    "number": 242,
    "title": "Valid Anagram",
    "slug": "valid-anagram",
    "difficulty": "Easy",
    "tags": "String, Frequency counting",
    "url": "https://leetcode.com/problems/valid-anagram/",
    "context": "Input: two strings containing lowercase English letters. Return whether they have identical character multiplicities; order is irrelevant.",
    "examples": "\"dusty\" and \"study\" → true; \"abb\" and \"ab\" → false.",
    "solution": "Require equal lengths, then count letters in the first string and subtract letters in the second. All counts are zero exactly when the multisets match.",
    "timeComplexity": "O(n+m)",
    "spaceComplexity": "O(1), 26 counters",
    "pitfall": "Character presence is insufficient: aab and abb contain the same distinct letters but different counts.",
    "followUp": "What representation would support Unicode code points?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] c = new int[26];\n        for (char x : s.toCharArray()) c[x - 'a']++;\n        for (char x : t.toCharArray()) if (--c[x - 'a'] < 0) return false;\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution(); if(!s.isAnagram(\"dusty\",\"study\"))throw new AssertionError(); if(s.isAnagram(\"aab\",\"abb\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Valid Anagram: what invariant or exchange argument makes the solution correct?",
        "back": "Require equal lengths, then count letters in the first string and subtract letters in the second. All counts are zero exactly when the multisets match."
      },
      {
        "type": "Edge case",
        "front": "Valid Anagram: what implementation trap should you check before submitting?",
        "back": "Character presence is insufficient: aab and abb contain the same distinct letters but different counts."
      },
      {
        "type": "Complexity",
        "front": "Valid Anagram: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n+m). Extra space: O(1), 26 counters."
      }
    ]
  },
  {
    "id": "lc-49",
    "number": 49,
    "title": "Group Anagrams",
    "slug": "group-anagrams",
    "difficulty": "Medium",
    "tags": "String, Hash map",
    "url": "https://leetcode.com/problems/group-anagrams/",
    "context": "Input: a list of lowercase English strings, including possible empty strings. Return groups whose members are rearrangements of the same letters. Group order is arbitrary.",
    "examples": "[\"arc\",\"car\",\"rat\"] → [[\"arc\",\"car\"],[\"rat\"]].",
    "solution": "Build a 26-count signature for each word and use it as a hash-map key. Equal signatures mean equal character multiplicities, so each map bucket is precisely one anagram class.",
    "timeComplexity": "O(total characters + 26n)",
    "spaceComplexity": "O(total characters + n), including grouped references and keys",
    "pitfall": "Separate counts in the key: raw digit concatenation can confuse counts such as 1,11 and 11,1.",
    "followUp": "How does sorting each word compare with a fixed-alphabet count signature?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            int[] c = new int[26];\n            for (char x : s.toCharArray()) c[x - 'a']++;\n            String key = Arrays.toString(c);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}\n",
    "testCode": "Solution s=new Solution(); List<List<String>> a=s.groupAnagrams(new String[]{\"arc\",\"car\",\"rat\"}); if(a.size()!=2||a.stream().noneMatch(g->g.contains(\"arc\")&&g.contains(\"car\")))throw new AssertionError(); if(s.groupAnagrams(new String[]{\"\",\"\"}).get(0).size()!=2)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Group Anagrams: what invariant or exchange argument makes the solution correct?",
        "back": "Build a 26-count signature for each word and use it as a hash-map key. Equal signatures mean equal character multiplicities, so each map bucket is precisely one anagram class."
      },
      {
        "type": "Edge case",
        "front": "Group Anagrams: what implementation trap should you check before submitting?",
        "back": "Separate counts in the key: raw digit concatenation can confuse counts such as 1,11 and 11,1."
      },
      {
        "type": "Complexity",
        "front": "Group Anagrams: state the time and extra-space costs of this implementation.",
        "back": "Time: O(total characters + 26n). Extra space: O(total characters + n), including grouped references and keys."
      }
    ]
  },
  {
    "id": "lc-238",
    "number": 238,
    "title": "Product of Array Except Self",
    "slug": "product-of-array-except-self",
    "difficulty": "Medium",
    "tags": "Array, Prefix products",
    "url": "https://leetcode.com/problems/product-of-array-except-self/",
    "context": "Input: at least two integers. Return an array whose entry i multiplies every input except index i, without division and in linear time. Prefix, suffix, and required output products fit a Java int.",
    "examples": "[2,5,3] → [15,6,10]. With [0,5,3], only the zero position has product 15.",
    "solution": "Write the product strictly left of i into the output. Sweep backward with the product strictly right of i and multiply it into that output. Each answer combines two disjoint regions that exclude i.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) excluding output",
    "pitfall": "The empty product is 1. Zeros work naturally; division fails on zero and is forbidden.",
    "followUp": "Why does this method still work with two zeros?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] productExceptSelf(int[] nums) {\n        int[] out = new int[nums.length];\n        int p = 1;\n        for (int i = 0; i < nums.length; i++) {\n            out[i] = p;\n            p *= nums[i];\n        }\n        p = 1;\n        for (int i = nums.length - 1; i >= 0; i--) {\n            out[i] *= p;\n            p *= nums[i];\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution(); if(!Arrays.equals(s.productExceptSelf(new int[]{2,5,3}),new int[]{15,6,10}))throw new AssertionError(); if(!Arrays.equals(s.productExceptSelf(new int[]{0,5,3}),new int[]{15,0,0}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Product of Array Except Self: what invariant or exchange argument makes the solution correct?",
        "back": "Write the product strictly left of i into the output. Sweep backward with the product strictly right of i and multiply it into that output. Each answer combines two disjoint regions that exclude i."
      },
      {
        "type": "Edge case",
        "front": "Product of Array Except Self: what implementation trap should you check before submitting?",
        "back": "The empty product is 1. Zeros work naturally; division fails on zero and is forbidden."
      },
      {
        "type": "Complexity",
        "front": "Product of Array Except Self: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1) excluding output."
      }
    ]
  },
  {
    "id": "lc-128",
    "number": 128,
    "title": "Longest Consecutive Sequence",
    "slug": "longest-consecutive-sequence",
    "difficulty": "Medium",
    "tags": "Array, Hash set",
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "context": "Input: an unsorted integer array, possibly empty, with values between -10^9 and 10^9. Return the longest run of consecutive distinct values; positions need not be adjacent. Aim for linear expected time.",
    "examples": "[7,3,5,4,3] → 3, from values 3,4,5.",
    "solution": "Deduplicate into a set. Start a forward walk only at x with no predecessor x-1. Every consecutive run is traversed exactly once, so nested-looking walks still visit O(n) values.",
    "timeComplexity": "O(n) expected",
    "spaceComplexity": "O(n)",
    "pitfall": "Iterate the deduplicated set, not the original array: repeated run starts can otherwise repeat long walks.",
    "followUp": "Why is starting at every input element potentially quadratic?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int x : nums) set.add(x);\n        int best = 0;\n        for (int x : set)\n            if (!set.contains(x - 1)) {\n                int y = x;\n                while (set.contains(y)) y++;\n                best = Math.max(best, y - x);\n            }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution(); if(s.longestConsecutive(new int[]{7,3,5,4,3})!=3)throw new AssertionError(); if(s.longestConsecutive(new int[]{})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Consecutive Sequence: what invariant or exchange argument makes the solution correct?",
        "back": "Deduplicate into a set. Start a forward walk only at x with no predecessor x-1. Every consecutive run is traversed exactly once, so nested-looking walks still visit O(n) values."
      },
      {
        "type": "Edge case",
        "front": "Longest Consecutive Sequence: what implementation trap should you check before submitting?",
        "back": "Iterate the deduplicated set, not the original array: repeated run starts can otherwise repeat long walks."
      },
      {
        "type": "Complexity",
        "front": "Longest Consecutive Sequence: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) expected. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-36",
    "number": 36,
    "title": "Valid Sudoku",
    "slug": "valid-sudoku",
    "difficulty": "Medium",
    "tags": "Matrix, Hash set",
    "url": "https://leetcode.com/problems/valid-sudoku/",
    "context": "Input: a 9×9 board containing digits 1–9 or dots for empty cells. Return whether all filled cells obey row, column, and 3×3-box uniqueness. You do not need to determine whether the puzzle is solvable.",
    "examples": "Two 6s in one row are invalid even if they lie in different boxes. An all-empty board is valid.",
    "solution": "For each filled cell track its digit separately in its row, column, and box. The box index is (row/3)*3+column/3. Reject any repeated mark; otherwise all three local constraints hold.",
    "timeComplexity": "O(81), constant board size",
    "spaceComplexity": "O(81)",
    "pitfall": "A valid partial board need not have a solution. Do not treat dots as repeated digits.",
    "followUp": "How would you generalize box indexing for a board of side b squared?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isValidSudoku(char[][] board) {\n        boolean[][] r = new boolean[9][9],\n            c = new boolean[9][9],\n            b = new boolean[9][9];\n        for (int i = 0; i < 9; i++) for (int j = 0; j < 9; j++) {\n            if (board[i][j] == '.') continue;\n            int d = board[i][j] - '1',\n                k = (i / 3) * 3 + j / 3;\n            if (r[i][d] || c[j][d] || b[k][d]) return false;\n            r[i][d] = c[j][d] = b[k][d] = true;\n        }\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution(); char[][] b=new char[9][9];for(char[] row:b)Arrays.fill(row,'.');if(!s.isValidSudoku(b))throw new AssertionError();b[0][0]='6';b[0][4]='6';if(s.isValidSudoku(b))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Valid Sudoku: what invariant or exchange argument makes the solution correct?",
        "back": "For each filled cell track its digit separately in its row, column, and box. The box index is (row/3)*3+column/3. Reject any repeated mark; otherwise all three local constraints hold."
      },
      {
        "type": "Edge case",
        "front": "Valid Sudoku: what implementation trap should you check before submitting?",
        "back": "A valid partial board need not have a solution. Do not treat dots as repeated digits."
      },
      {
        "type": "Complexity",
        "front": "Valid Sudoku: state the time and extra-space costs of this implementation.",
        "back": "Time: O(81), constant board size. Extra space: O(81)."
      }
    ]
  },
  {
    "id": "lc-303",
    "number": 303,
    "title": "Range Sum Query - Immutable",
    "slug": "range-sum-query-immutable",
    "difficulty": "Easy",
    "tags": "Array, Prefix sum",
    "url": "https://leetcode.com/problems/range-sum-query-immutable/",
    "context": "Input: an immutable integer array followed by valid inclusive index-range queries. Return the sum of each range. Preprocess once; each query should be constant time. The standalone class here is Solution; rename it and its constructor to NumArray on LeetCode.",
    "examples": "[5,-2,7], query [1,2] → 5. Prefix totals are [0,5,3,10].",
    "solution": "Store prefix[i] as the sum of the first i elements. Subtract prefix[left] from prefix[right+1]; the unwanted earlier region cancels.",
    "timeComplexity": "O(n) construction; O(1) per query",
    "spaceComplexity": "O(n)",
    "pitfall": "The right endpoint is inclusive, so use right+1. A leading zero removes the left=0 special case.",
    "followUp": "What data structure is needed if values can change between queries?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    private final int[] prefix;\n\n    public Solution(int[] nums) {\n        prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) prefix[i + 1] =\n            prefix[i] + nums[i];\n    }\n\n    public int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n}\n",
    "testCode": "Solution s=new Solution(new int[]{5,-2,7});if(s.sumRange(1,2)!=5)throw new AssertionError();if(s.sumRange(0,0)!=5)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Range Sum Query - Immutable: what invariant or exchange argument makes the solution correct?",
        "back": "Store prefix[i] as the sum of the first i elements. Subtract prefix[left] from prefix[right+1]; the unwanted earlier region cancels."
      },
      {
        "type": "Edge case",
        "front": "Range Sum Query - Immutable: what implementation trap should you check before submitting?",
        "back": "The right endpoint is inclusive, so use right+1. A leading zero removes the left=0 special case."
      },
      {
        "type": "Complexity",
        "front": "Range Sum Query - Immutable: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) construction; O(1) per query. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-304",
    "number": 304,
    "title": "Range Sum Query 2D - Immutable",
    "slug": "range-sum-query-2d-immutable",
    "difficulty": "Medium",
    "tags": "Matrix, Prefix sum",
    "url": "https://leetcode.com/problems/range-sum-query-2d-immutable/",
    "context": "Input: an immutable rectangular matrix and valid inclusive rectangle queries. Return each rectangle sum. The standalone class is Solution; rename it and its constructor to NumMatrix for LeetCode.",
    "examples": "[[2,4],[3,1]], rectangle (0,1) through (1,1) → 5; whole matrix → 10.",
    "solution": "Build a padded two-dimensional prefix table. Each entry includes above and left, subtracting their shared corner. A rectangle query similarly takes its large prefix, removes top and left strips, then restores the doubly removed corner.",
    "timeComplexity": "O(rows×cols) construction; O(1) per query",
    "spaceComplexity": "O(rows×cols)",
    "pitfall": "Use a zero border and add back the top-left overlap; subtracting it twice undercounts.",
    "followUp": "How would you answer rectangle sums when individual cells can be updated?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    private final int[][] p;\n\n    public Solution(int[][] matrix) {\n        int m = matrix.length,\n            n = matrix[0].length;\n        p = new int[m + 1][n + 1];\n        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) p[i + 1][\n            j + 1\n        ] = matrix[i][j] + p[i][j + 1] + p[i + 1][j] - p[i][j];\n    }\n\n    public int sumRegion(int r1, int c1, int r2, int c2) {\n        return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];\n    }\n}\n",
    "testCode": "Solution s=new Solution(new int[][]{{2,4},{3,1}});if(s.sumRegion(0,1,1,1)!=5)throw new AssertionError();if(s.sumRegion(0,0,1,1)!=10)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Range Sum Query 2D - Immutable: what invariant or exchange argument makes the solution correct?",
        "back": "Build a padded two-dimensional prefix table. Each entry includes above and left, subtracting their shared corner. A rectangle query similarly takes its large prefix, removes top and left strips, then restores the doubly removed corner."
      },
      {
        "type": "Edge case",
        "front": "Range Sum Query 2D - Immutable: what implementation trap should you check before submitting?",
        "back": "Use a zero border and add back the top-left overlap; subtracting it twice undercounts."
      },
      {
        "type": "Complexity",
        "front": "Range Sum Query 2D - Immutable: state the time and extra-space costs of this implementation.",
        "back": "Time: O(rows×cols) construction; O(1) per query. Extra space: O(rows×cols)."
      }
    ]
  },
  {
    "id": "lc-560",
    "number": 560,
    "title": "Subarray Sum Equals K",
    "slug": "subarray-sum-equals-k",
    "difficulty": "Medium",
    "tags": "Array, Prefix sum, Hash map",
    "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "context": "Input: integers that may be positive, zero, or negative, and a target k. Return the number of nonempty contiguous subarrays summing to k. Array length is at most 20,000 and each magnitude at most 1,000.",
    "examples": "[2,-1,2], k=3 → 1; [0,0], k=0 → 3.",
    "solution": "At prefix sum p, every earlier prefix p-k starts a valid subarray. Maintain frequencies of earlier prefixes, seeded with zero once. Query the frequency before adding the current prefix.",
    "timeComplexity": "O(n) expected",
    "spaceComplexity": "O(n)",
    "pitfall": "Negative values invalidate the usual shrink-on-too-large window. Store frequencies, not just whether a prefix exists.",
    "followUp": "Why must the current prefix be inserted after counting matches?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int subarraySum(int[] nums, int k) {\n        Map<Integer, Integer> f = new HashMap<>();\n        f.put(0, 1);\n        int p = 0,\n            ans = 0;\n        for (int x : nums) {\n            p += x;\n            ans += f.getOrDefault(p - k, 0);\n            f.merge(p, 1, Integer::sum);\n        }\n        return ans;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.subarraySum(new int[]{2,-1,2},3)!=1)throw new AssertionError();if(s.subarraySum(new int[]{0,0},0)!=3)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Subarray Sum Equals K: what invariant or exchange argument makes the solution correct?",
        "back": "At prefix sum p, every earlier prefix p-k starts a valid subarray. Maintain frequencies of earlier prefixes, seeded with zero once. Query the frequency before adding the current prefix."
      },
      {
        "type": "Edge case",
        "front": "Subarray Sum Equals K: what implementation trap should you check before submitting?",
        "back": "Negative values invalidate the usual shrink-on-too-large window. Store frequencies, not just whether a prefix exists."
      },
      {
        "type": "Complexity",
        "front": "Subarray Sum Equals K: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) expected. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-525",
    "number": 525,
    "title": "Contiguous Array",
    "slug": "contiguous-array",
    "difficulty": "Medium",
    "tags": "Array, Prefix sum, Hash map",
    "url": "https://leetcode.com/problems/contiguous-array/",
    "context": "Input: a binary array. Return the greatest length of a contiguous segment containing equal numbers of zeros and ones. Return zero if no nonempty segment qualifies.",
    "examples": "[0,0,1,1,0] → 4.",
    "solution": "Treat zero as -1 and one as +1. Equal counts become a zero-sum interval, so repeated prefix balances delimit valid segments. Store only the earliest index for each balance to maximize distance.",
    "timeComplexity": "O(n) expected",
    "spaceComplexity": "O(n)",
    "pitfall": "Seed balance zero at index -1. Replacing an earliest occurrence with a later one loses longer candidates.",
    "followUp": "How does the map differ from the map used to count all target-sum subarrays?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findMaxLength(int[] nums) {\n        Map<Integer, Integer> first = new HashMap<>();\n        first.put(0, -1);\n        int p = 0,\n            best = 0;\n        for (int i = 0; i < nums.length; i++) {\n            p += nums[i] == 0 ? -1 : 1;\n            if (first.containsKey(p)) best = Math.max(best, i - first.get(p));\n            else first.put(p, i);\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findMaxLength(new int[]{0,0,1,1,0})!=4)throw new AssertionError();if(s.findMaxLength(new int[]{1,1})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Contiguous Array: what invariant or exchange argument makes the solution correct?",
        "back": "Treat zero as -1 and one as +1. Equal counts become a zero-sum interval, so repeated prefix balances delimit valid segments. Store only the earliest index for each balance to maximize distance."
      },
      {
        "type": "Edge case",
        "front": "Contiguous Array: what implementation trap should you check before submitting?",
        "back": "Seed balance zero at index -1. Replacing an earliest occurrence with a later one loses longer candidates."
      },
      {
        "type": "Complexity",
        "front": "Contiguous Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) expected. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-724",
    "number": 724,
    "title": "Find Pivot Index",
    "slug": "find-pivot-index",
    "difficulty": "Easy",
    "tags": "Array, Prefix sum",
    "url": "https://leetcode.com/problems/find-pivot-index/",
    "context": "Input: integers, including negatives. Return the leftmost index whose sum strictly to the left equals its sum strictly to the right; return -1 if none exists. An empty side sums to zero.",
    "examples": "[2,1,-1] → 0 because the right side sums to zero.",
    "solution": "Compute the total and sweep with the sum strictly before i. The right sum is total-left-nums[i]. Return the first equality, then update left only after checking.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Exclude the pivot value from both sides. Checking after adding it to the left changes the condition.",
    "followUp": "Could multiple pivots exist when zeros occur?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int pivotIndex(int[] nums) {\n        int total = 0;\n        for (int x : nums) total += x;\n        int left = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (left == total - left - nums[i]) return i;\n            left += nums[i];\n        }\n        return -1;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.pivotIndex(new int[]{2,1,-1})!=0)throw new AssertionError();if(s.pivotIndex(new int[]{1,2,3})!=-1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find Pivot Index: what invariant or exchange argument makes the solution correct?",
        "back": "Compute the total and sweep with the sum strictly before i. The right sum is total-left-nums[i]. Return the first equality, then update left only after checking."
      },
      {
        "type": "Edge case",
        "front": "Find Pivot Index: what implementation trap should you check before submitting?",
        "back": "Exclude the pivot value from both sides. Checking after adding it to the left changes the condition."
      },
      {
        "type": "Complexity",
        "front": "Find Pivot Index: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-205",
    "number": 205,
    "title": "Isomorphic Strings",
    "slug": "isomorphic-strings",
    "difficulty": "Easy",
    "tags": "String, Hash map",
    "url": "https://leetcode.com/problems/isomorphic-strings/",
    "context": "Input: two equal-length strings of ASCII characters. Return whether one can be transformed into the other using a consistent one-to-one character mapping. A character may map to itself.",
    "examples": "\"paper\" and \"title\" → true; \"ab\" and \"cc\" → false.",
    "solution": "Track the last position of each character in both strings. Paired characters must have identical previous occurrence positions. This enforces both consistent reuse and one-to-one mapping.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1), fixed ASCII alphabet",
    "pitfall": "A forward map alone permits two source characters to map to the same target. Enforce the reverse direction too.",
    "followUp": "How can two hash maps replace the fixed-size character arrays?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isIsomorphic(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] a = new int[128],\n            b = new int[128];\n        for (int i = 0; i < s.length(); i++) {\n            char x = s.charAt(i),\n                y = t.charAt(i);\n            if (a[x] != b[y]) return false;\n            a[x] = b[y] = i + 1;\n        }\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.isIsomorphic(\"paper\",\"title\"))throw new AssertionError();if(s.isIsomorphic(\"ab\",\"cc\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Isomorphic Strings: what invariant or exchange argument makes the solution correct?",
        "back": "Track the last position of each character in both strings. Paired characters must have identical previous occurrence positions. This enforces both consistent reuse and one-to-one mapping."
      },
      {
        "type": "Edge case",
        "front": "Isomorphic Strings: what implementation trap should you check before submitting?",
        "back": "A forward map alone permits two source characters to map to the same target. Enforce the reverse direction too."
      },
      {
        "type": "Complexity",
        "front": "Isomorphic Strings: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1), fixed ASCII alphabet."
      }
    ]
  },
  {
    "id": "lc-290",
    "number": 290,
    "title": "Word Pattern",
    "slug": "word-pattern",
    "difficulty": "Easy",
    "tags": "String, Hash map",
    "url": "https://leetcode.com/problems/word-pattern/",
    "context": "Input: a lowercase-letter pattern and nonempty words separated by single spaces. Return whether pattern positions and words form a bijection. The numbers of positions and words must match.",
    "examples": "pattern \"abba\", words \"red blue blue red\" → true.",
    "solution": "Maintain both letter-to-word and word-to-letter maps while scanning paired positions. Each established association must agree in both directions, which is exactly a bijection.",
    "timeComplexity": "O(total input characters)",
    "spaceComplexity": "O(distinct words + pattern letters)",
    "pitfall": "Matching repeated letters is not enough: pattern ab cannot match dog dog.",
    "followUp": "Can last-seen position maps unify the two mapping checks?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean wordPattern(String pattern, String s) {\n        String[] w = s.split(\" \");\n        if (w.length != pattern.length()) return false;\n        Map<Character, String> a = new HashMap<>();\n        Map<String, Character> b = new HashMap<>();\n        for (int i = 0; i < w.length; i++) {\n            char c = pattern.charAt(i);\n            if (a.containsKey(c) && !a.get(c).equals(w[i])) return false;\n            if (b.containsKey(w[i]) && b.get(w[i]) != c) return false;\n            a.put(c, w[i]);\n            b.put(w[i], c);\n        }\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.wordPattern(\"abba\",\"red blue blue red\"))throw new AssertionError();if(s.wordPattern(\"ab\",\"dog dog\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Word Pattern: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain both letter-to-word and word-to-letter maps while scanning paired positions. Each established association must agree in both directions, which is exactly a bijection."
      },
      {
        "type": "Edge case",
        "front": "Word Pattern: what implementation trap should you check before submitting?",
        "back": "Matching repeated letters is not enough: pattern ab cannot match dog dog."
      },
      {
        "type": "Complexity",
        "front": "Word Pattern: state the time and extra-space costs of this implementation.",
        "back": "Time: O(total input characters). Extra space: O(distinct words + pattern letters)."
      }
    ]
  },
  {
    "id": "lc-383",
    "number": 383,
    "title": "Ransom Note",
    "slug": "ransom-note",
    "difficulty": "Easy",
    "tags": "String, Frequency counting",
    "url": "https://leetcode.com/problems/ransom-note/",
    "context": "Input: a requested string and a magazine string, both lowercase English. Return whether the magazine supplies every requested character, consuming each occurrence at most once.",
    "examples": "note \"eel\", magazine \"level\" → true; note \"eee\" → false with the same magazine.",
    "solution": "Count the available magazine letters. Decrement once for each required letter and fail when any count becomes negative. Nonnegative counters mean all demands have been met.",
    "timeComplexity": "O(n+m)",
    "spaceComplexity": "O(1)",
    "pitfall": "One available occurrence cannot satisfy multiple copies of a required letter.",
    "followUp": "How would you report which letters and counts are missing?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean canConstruct(String ransomNote, String magazine) {\n        int[] c = new int[26];\n        for (char x : magazine.toCharArray()) c[x - 'a']++;\n        for (char x : ransomNote.toCharArray())\n            if (--c[x - 'a'] < 0) return false;\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.canConstruct(\"eel\",\"level\"))throw new AssertionError();if(s.canConstruct(\"eee\",\"level\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Ransom Note: what invariant or exchange argument makes the solution correct?",
        "back": "Count the available magazine letters. Decrement once for each required letter and fail when any count becomes negative. Nonnegative counters mean all demands have been met."
      },
      {
        "type": "Edge case",
        "front": "Ransom Note: what implementation trap should you check before submitting?",
        "back": "One available occurrence cannot satisfy multiple copies of a required letter."
      },
      {
        "type": "Complexity",
        "front": "Ransom Note: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n+m). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-387",
    "number": 387,
    "title": "First Unique Character in a String",
    "slug": "first-unique-character-in-a-string",
    "difficulty": "Easy",
    "tags": "String, Frequency counting",
    "url": "https://leetcode.com/problems/first-unique-character-in-a-string/",
    "context": "Input: a lowercase English string. Return the index of its earliest character appearing exactly once, or -1 if all characters repeat.",
    "examples": "\"swiss\" → 1, the position of w; \"aabb\" → -1.",
    "solution": "Count all characters, then scan the original order for count one. The second pass preserves the required earliest position instead of relying on map iteration order.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "A character that is unique early in the scan may repeat later; finish counting before selecting.",
    "followUp": "How would a streaming API maintain the current first unique character?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int firstUniqChar(String s) {\n        int[] c = new int[26];\n        for (char x : s.toCharArray()) c[x - 'a']++;\n        for (int i = 0; i < s.length(); i++) if (\n            c[s.charAt(i) - 'a'] == 1\n        ) return i;\n        return -1;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.firstUniqChar(\"swiss\")!=1)throw new AssertionError();if(s.firstUniqChar(\"aabb\")!=-1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "First Unique Character in a String: what invariant or exchange argument makes the solution correct?",
        "back": "Count all characters, then scan the original order for count one. The second pass preserves the required earliest position instead of relying on map iteration order."
      },
      {
        "type": "Edge case",
        "front": "First Unique Character in a String: what implementation trap should you check before submitting?",
        "back": "A character that is unique early in the scan may repeat later; finish counting before selecting."
      },
      {
        "type": "Complexity",
        "front": "First Unique Character in a String: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-169",
    "number": 169,
    "title": "Majority Element",
    "slug": "majority-element",
    "difficulty": "Easy",
    "tags": "Array, Voting",
    "url": "https://leetcode.com/problems/majority-element/",
    "context": "Input: a nonempty integer array with a guaranteed element appearing more than half the time. Return that value.",
    "examples": "[7,2,7,7,3] → 7.",
    "solution": "Maintain a candidate and a balance. Equal values reinforce it; different values cancel a vote. Removing unlike pairs cannot eliminate a strict majority, so the final candidate is the answer.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The guarantee matters. Without it, count the candidate in a second pass before claiming a majority.",
    "followUp": "How would you adapt cancellation to elements occurring more than n/3 times?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int majorityElement(int[] nums) {\n        int candidate = 0,\n            count = 0;\n        for (int x : nums) {\n            if (count == 0) candidate = x;\n            count += x == candidate ? 1 : -1;\n        }\n        return candidate;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.majorityElement(new int[]{7,2,7,7,3})!=7)throw new AssertionError();if(s.majorityElement(new int[]{9})!=9)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Majority Element: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain a candidate and a balance. Equal values reinforce it; different values cancel a vote. Removing unlike pairs cannot eliminate a strict majority, so the final candidate is the answer."
      },
      {
        "type": "Edge case",
        "front": "Majority Element: what implementation trap should you check before submitting?",
        "back": "The guarantee matters. Without it, count the candidate in a second pass before claiming a majority."
      },
      {
        "type": "Complexity",
        "front": "Majority Element: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-229",
    "number": 229,
    "title": "Majority Element II",
    "slug": "majority-element-ii",
    "difficulty": "Medium",
    "tags": "Array, Voting",
    "url": "https://leetcode.com/problems/majority-element-ii/",
    "context": "Input: an integer array. Return every value occurring strictly more than floor(n/3) times. There can be at most two such values; their existence is not guaranteed.",
    "examples": "[4,4,2,2,4,2,9] → [4,2] in either order.",
    "solution": "Track two candidate balances. Match existing candidates first, occupy an empty slot next, otherwise cancel one vote from both. Removing triples of distinct values preserves potential n/3 winners. Verify both survivors in a second pass.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) excluding output",
    "pitfall": "Candidate selection only produces possibilities. Verification is required, and duplicate candidates must not be counted twice.",
    "followUp": "Why can there be at most two values above the n/3 threshold?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> majorityElement(int[] nums) {\n        int a = 0,\n            b = 1,\n            ca = 0,\n            cb = 0;\n        for (int x : nums) {\n            if (x == a) ca++;\n            else if (x == b) cb++;\n            else if (ca == 0) {\n                a = x;\n                ca = 1;\n            } else if (cb == 0) {\n                b = x;\n                cb = 1;\n            } else {\n                ca--;\n                cb--;\n            }\n        }\n        ca = cb = 0;\n        for (int x : nums) {\n            if (x == a) ca++;\n            else if (x == b) cb++;\n        }\n        List<Integer> out = new ArrayList<>();\n        if (ca > nums.length / 3) out.add(a);\n        if (cb > nums.length / 3) out.add(b);\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();List<Integer>a=s.majorityElement(new int[]{4,4,2,2,4,2,9});if(a.size()!=2||!a.containsAll(Arrays.asList(4,2)))throw new AssertionError();if(!s.majorityElement(new int[]{1,2,3}).isEmpty())throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Majority Element II: what invariant or exchange argument makes the solution correct?",
        "back": "Track two candidate balances. Match existing candidates first, occupy an empty slot next, otherwise cancel one vote from both. Removing triples of distinct values preserves potential n/3 winners. Verify both survivors in a second pass."
      },
      {
        "type": "Edge case",
        "front": "Majority Element II: what implementation trap should you check before submitting?",
        "back": "Candidate selection only produces possibilities. Verification is required, and duplicate candidates must not be counted twice."
      },
      {
        "type": "Complexity",
        "front": "Majority Element II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1) excluding output."
      }
    ]
  },
  {
    "id": "lc-27",
    "number": 27,
    "title": "Remove Element",
    "slug": "remove-element",
    "difficulty": "Easy",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/remove-element/",
    "context": "Input: an integer array and a value to remove. Modify the array in place so its first k entries contain all other values, and return k. Entries after k are irrelevant; order need not be preserved.",
    "examples": "[5,2,5,3], remove 5 → k=2 with prefix [2,3].",
    "solution": "Use a write index for the next retained value. Scan each value once and copy only nonmatches. The prefix before write always contains exactly the retained elements seen so far.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The judge checks only the first k entries. Do not mistake the backing array length for the logical output length.",
    "followUp": "Can swapping with the last unprocessed element reduce writes when removals are rare?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int removeElement(int[] nums, int val) {\n        int w = 0;\n        for (int x : nums) if (x != val) nums[w++] = x;\n        return w;\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={5,2,5,3};if(s.removeElement(a,5)!=2||a[0]!=2||a[1]!=3)throw new AssertionError();if(s.removeElement(new int[]{5,5},5)!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Element: what invariant or exchange argument makes the solution correct?",
        "back": "Use a write index for the next retained value. Scan each value once and copy only nonmatches. The prefix before write always contains exactly the retained elements seen so far."
      },
      {
        "type": "Edge case",
        "front": "Remove Element: what implementation trap should you check before submitting?",
        "back": "The judge checks only the first k entries. Do not mistake the backing array length for the logical output length."
      },
      {
        "type": "Complexity",
        "front": "Remove Element: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-26",
    "number": 26,
    "title": "Remove Duplicates from Sorted Array",
    "slug": "remove-duplicates-from-sorted-array",
    "difficulty": "Easy",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "context": "Input: a nondecreasing integer array. Compact it in place so each distinct value appears once in the first k positions, preserving order, and return k.",
    "examples": "[1,1,4,4,6] → k=3, prefix [1,4,6].",
    "solution": "Keep a write pointer and append a scanned value only when it differs from the last written value. Sorted order makes all duplicates contiguous, so one comparison identifies each new group.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Compare against the retained prefix, and handle an empty prefix before reading write-1.",
    "followUp": "What changes when each distinct value may appear twice?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int removeDuplicates(int[] nums) {\n        int w = 0;\n        for (int x : nums) if (w == 0 || x != nums[w - 1]) nums[w++] = x;\n        return w;\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={1,1,4,4,6};if(s.removeDuplicates(a)!=3||a[2]!=6)throw new AssertionError();int[]b={2,2};if(s.removeDuplicates(b)!=1||b[0]!=2)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Duplicates from Sorted Array: what invariant or exchange argument makes the solution correct?",
        "back": "Keep a write pointer and append a scanned value only when it differs from the last written value. Sorted order makes all duplicates contiguous, so one comparison identifies each new group."
      },
      {
        "type": "Edge case",
        "front": "Remove Duplicates from Sorted Array: what implementation trap should you check before submitting?",
        "back": "Compare against the retained prefix, and handle an empty prefix before reading write-1."
      },
      {
        "type": "Complexity",
        "front": "Remove Duplicates from Sorted Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-80",
    "number": 80,
    "title": "Remove Duplicates from Sorted Array II",
    "slug": "remove-duplicates-from-sorted-array-ii",
    "difficulty": "Medium",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/",
    "context": "Input: a nondecreasing array. Retain at most two copies of each distinct value in place, preserving order. Return the length of the retained prefix.",
    "examples": "[1,1,1,2,2,2] → k=4, prefix [1,1,2,2].",
    "solution": "Accept the first two values. Thereafter accept x only if it differs from output[write-2]. In sorted order, equality there means two copies of x are already retained.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The comparison uses write-2, not the original read index minus two, because discarded values change positions.",
    "followUp": "How would you generalize the allowed count from two to k?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int removeDuplicates(int[] nums) {\n        int w = 0;\n        for (int x : nums) if (w < 2 || x != nums[w - 2]) nums[w++] = x;\n        return w;\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={1,1,1,2,2,2};if(s.removeDuplicates(a)!=4||!Arrays.equals(Arrays.copyOf(a,4),new int[]{1,1,2,2}))throw new AssertionError();if(s.removeDuplicates(new int[]{8})!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Duplicates from Sorted Array II: what invariant or exchange argument makes the solution correct?",
        "back": "Accept the first two values. Thereafter accept x only if it differs from output[write-2]. In sorted order, equality there means two copies of x are already retained."
      },
      {
        "type": "Edge case",
        "front": "Remove Duplicates from Sorted Array II: what implementation trap should you check before submitting?",
        "back": "The comparison uses write-2, not the original read index minus two, because discarded values change positions."
      },
      {
        "type": "Complexity",
        "front": "Remove Duplicates from Sorted Array II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-283",
    "number": 283,
    "title": "Move Zeroes",
    "slug": "move-zeroes",
    "difficulty": "Easy",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/move-zeroes/",
    "context": "Input: an integer array. Move every zero to the end in place while preserving the relative order of nonzero values.",
    "examples": "[0,4,0,2] → [4,2,0,0].",
    "solution": "Compact nonzero values into the prefix using a write index, then fill the remaining suffix with zeros. Stable scanning preserves the relative order of retained values.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Swapping every zero with the final element can change nonzero order, violating the requirement.",
    "followUp": "How could you reduce redundant writes on an array with no zeros?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void moveZeroes(int[] nums) {\n        int w = 0;\n        for (int x : nums) if (x != 0) nums[w++] = x;\n        while (w < nums.length) nums[w++] = 0;\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={0,4,0,2};s.moveZeroes(a);if(!Arrays.equals(a,new int[]{4,2,0,0}))throw new AssertionError();int[]b={0};s.moveZeroes(b);if(b[0]!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Move Zeroes: what invariant or exchange argument makes the solution correct?",
        "back": "Compact nonzero values into the prefix using a write index, then fill the remaining suffix with zeros. Stable scanning preserves the relative order of retained values."
      },
      {
        "type": "Edge case",
        "front": "Move Zeroes: what implementation trap should you check before submitting?",
        "back": "Swapping every zero with the final element can change nonzero order, violating the requirement."
      },
      {
        "type": "Complexity",
        "front": "Move Zeroes: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-88",
    "number": 88,
    "title": "Merge Sorted Array",
    "slug": "merge-sorted-array",
    "difficulty": "Easy",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/merge-sorted-array/",
    "context": "Input: sorted nums1 with m valid values and capacity m+n, plus sorted nums2 with n values. Merge into nums1 in nondecreasing order. Either valid portion may be empty.",
    "examples": "nums1=[2,6,0,0], m=2; nums2=[1,5] → [1,2,5,6].",
    "solution": "Fill nums1 from the back, choosing the larger remaining tail each time. Writing at the highest free index cannot overwrite an unread value in nums1.",
    "timeComplexity": "O(m+n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Forward writes overwrite valid nums1 values. Zero capacity placeholders are not part of the initial sorted data.",
    "followUp": "Why can the loop stop once nums2 is exhausted?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        int i = m - 1,\n            j = n - 1,\n            w = m + n - 1;\n        while (j >= 0) {\n            if (i >= 0 && nums1[i] > nums2[j]) nums1[w--] = nums1[i--];\n            else nums1[w--] = nums2[j--];\n        }\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={2,6,0,0};s.merge(a,2,new int[]{1,5},2);if(!Arrays.equals(a,new int[]{1,2,5,6}))throw new AssertionError();int[]b={0};s.merge(b,0,new int[]{7},1);if(b[0]!=7)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Merge Sorted Array: what invariant or exchange argument makes the solution correct?",
        "back": "Fill nums1 from the back, choosing the larger remaining tail each time. Writing at the highest free index cannot overwrite an unread value in nums1."
      },
      {
        "type": "Edge case",
        "front": "Merge Sorted Array: what implementation trap should you check before submitting?",
        "back": "Forward writes overwrite valid nums1 values. Zero capacity placeholders are not part of the initial sorted data."
      },
      {
        "type": "Complexity",
        "front": "Merge Sorted Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(m+n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-189",
    "number": 189,
    "title": "Rotate Array",
    "slug": "rotate-array",
    "difficulty": "Medium",
    "tags": "Array, Reversal",
    "url": "https://leetcode.com/problems/rotate-array/",
    "context": "Input: a nonempty integer array and a nonnegative k. Rotate the array right by k positions in place; k may exceed its length.",
    "examples": "[1,2,3,4,5], k=2 → [4,5,1,2,3].",
    "solution": "Reduce k modulo n. Reverse the entire array, then reverse its first k values and remaining values separately. The first reversal exchanges the two blocks; the next two restore each block order.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Normalize k before indexing. With k=0, reversing the entire array twice restores the original.",
    "followUp": "Can you derive the destination index of each element and use cycle replacement?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void rotate(int[] nums, int k) {\n        k %= nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n\n    private void reverse(int[] a, int l, int r) {\n        while (l < r) {\n            int t = a[l];\n            a[l++] = a[r];\n            a[r--] = t;\n        }\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={1,2,3,4,5};s.rotate(a,2);if(!Arrays.equals(a,new int[]{4,5,1,2,3}))throw new AssertionError();int[]b={1,2};s.rotate(b,4);if(!Arrays.equals(b,new int[]{1,2}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Rotate Array: what invariant or exchange argument makes the solution correct?",
        "back": "Reduce k modulo n. Reverse the entire array, then reverse its first k values and remaining values separately. The first reversal exchanges the two blocks; the next two restore each block order."
      },
      {
        "type": "Edge case",
        "front": "Rotate Array: what implementation trap should you check before submitting?",
        "back": "Normalize k before indexing. With k=0, reversing the entire array twice restores the original."
      },
      {
        "type": "Complexity",
        "front": "Rotate Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-75",
    "number": 75,
    "title": "Sort Colors",
    "slug": "sort-colors",
    "difficulty": "Medium",
    "tags": "Array, Three-way partition",
    "url": "https://leetcode.com/problems/sort-colors/",
    "context": "Input: an array containing only 0, 1, and 2. Rearrange it in place into nondecreasing order without a library sort.",
    "examples": "[2,0,1,2,0] → [0,0,1,2,2].",
    "solution": "Maintain regions: before low are zeros, low through mid-1 are ones, after high are twos, and mid through high is unknown. Move 0 left, 2 right, and advance over 1 until the unknown region is empty.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "After swapping a 2 with high, do not advance mid: the incoming value has not been classified.",
    "followUp": "How do the four regions prove termination and correctness?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void sortColors(int[] nums) {\n        int lo = 0,\n            mid = 0,\n            hi = nums.length - 1;\n        while (mid <= hi) {\n            if (nums[mid] == 0) {\n                int t = nums[lo];\n                nums[lo++] = nums[mid];\n                nums[mid++] = t;\n            } else if (nums[mid] == 2) {\n                int t = nums[hi];\n                nums[hi--] = nums[mid];\n                nums[mid] = t;\n            } else mid++;\n        }\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={2,0,1,2,0};s.sortColors(a);if(!Arrays.equals(a,new int[]{0,0,1,2,2}))throw new AssertionError();int[]b={2,2,0};s.sortColors(b);if(!Arrays.equals(b,new int[]{0,2,2}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Sort Colors: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain regions: before low are zeros, low through mid-1 are ones, after high are twos, and mid through high is unknown. Move 0 left, 2 right, and advance over 1 until the unknown region is empty."
      },
      {
        "type": "Edge case",
        "front": "Sort Colors: what implementation trap should you check before submitting?",
        "back": "After swapping a 2 with high, do not advance mid: the incoming value has not been classified."
      },
      {
        "type": "Complexity",
        "front": "Sort Colors: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-31",
    "number": 31,
    "title": "Next Permutation",
    "slug": "next-permutation",
    "difficulty": "Medium",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/next-permutation/",
    "context": "Input: a nonempty integer array, possibly with duplicates. Replace it in place with the next lexicographically greater permutation. If none exists, produce the smallest permutation.",
    "examples": "[1,4,3,2] → [2,1,3,4]; [3,2,1] → [1,2,3].",
    "solution": "Find the rightmost ascent: its suffix is nonincreasing and cannot improve without changing the pivot. Swap the pivot with the smallest larger suffix value, found from the right, then reverse the suffix into its smallest order.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Use strict greater-than for the successor. If there is no pivot, reverse the entire array.",
    "followUp": "Why does reversing the suffix suffice instead of sorting it?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void nextPermutation(int[] nums) {\n        int i = nums.length - 2;\n        while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n        if (i >= 0) {\n            int j = nums.length - 1;\n            while (nums[j] <= nums[i]) j--;\n            swap(nums, i, j);\n        }\n        int l = i + 1,\n            r = nums.length - 1;\n        while (l < r) swap(nums, l++, r--);\n    }\n\n    private void swap(int[] a, int i, int j) {\n        int t = a[i];\n        a[i] = a[j];\n        a[j] = t;\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[]a={1,4,3,2};s.nextPermutation(a);if(!Arrays.equals(a,new int[]{2,1,3,4}))throw new AssertionError();int[]b={3,2,1};s.nextPermutation(b);if(!Arrays.equals(b,new int[]{1,2,3}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Next Permutation: what invariant or exchange argument makes the solution correct?",
        "back": "Find the rightmost ascent: its suffix is nonincreasing and cannot improve without changing the pivot. Swap the pivot with the smallest larger suffix value, found from the right, then reverse the suffix into its smallest order."
      },
      {
        "type": "Edge case",
        "front": "Next Permutation: what implementation trap should you check before submitting?",
        "back": "Use strict greater-than for the successor. If there is no pivot, reverse the entire array."
      },
      {
        "type": "Complexity",
        "front": "Next Permutation: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-125",
    "number": 125,
    "title": "Valid Palindrome",
    "slug": "valid-palindrome",
    "difficulty": "Easy",
    "tags": "String, Two pointers",
    "url": "https://leetcode.com/problems/valid-palindrome/",
    "context": "Input: a string of printable ASCII characters. Ignore nonalphanumeric characters and letter case; return whether the remaining sequence is a palindrome. An empty cleaned sequence qualifies.",
    "examples": "\"No lemon, no melon!\" → true; \"race a car\" → false.",
    "solution": "Move pointers inward, skipping punctuation independently. Compare normalized endpoint characters; any mismatch disproves the palindrome. All previously consumed pairs match.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Skip punctuation before comparing, and recheck pointer bounds when only punctuation remains.",
    "followUp": "How would Unicode normalization affect the definition of a matching character?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isPalindrome(String s) {\n        int l = 0,\n            r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (\n                Character.toLowerCase(s.charAt(l++)) !=\n                Character.toLowerCase(s.charAt(r--))\n            ) return false;\n        }\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.isPalindrome(\"No lemon, no melon!\"))throw new AssertionError();if(s.isPalindrome(\"race a car\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Valid Palindrome: what invariant or exchange argument makes the solution correct?",
        "back": "Move pointers inward, skipping punctuation independently. Compare normalized endpoint characters; any mismatch disproves the palindrome. All previously consumed pairs match."
      },
      {
        "type": "Edge case",
        "front": "Valid Palindrome: what implementation trap should you check before submitting?",
        "back": "Skip punctuation before comparing, and recheck pointer bounds when only punctuation remains."
      },
      {
        "type": "Complexity",
        "front": "Valid Palindrome: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-680",
    "number": 680,
    "title": "Valid Palindrome II",
    "slug": "valid-palindrome-ii",
    "difficulty": "Easy",
    "tags": "String, Two pointers",
    "url": "https://leetcode.com/problems/valid-palindrome-ii/",
    "context": "Input: lowercase English letters. Return whether deleting at most one character can make the string a palindrome. Deleting nothing is allowed.",
    "examples": "\"radkar\" → true by removing k; \"abc\" → false.",
    "solution": "Match inward until the first mismatch. Any successful single deletion must remove one of these two endpoints; test both remaining ranges as ordinary palindromes.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Try both deletions at the first mismatch. Greedily choosing only one side can reject a valid answer.",
    "followUp": "Why are deletions strictly inside the mismatching endpoints unable to repair that mismatch?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean validPalindrome(String s) {\n        int l = 0,\n            r = s.length() - 1;\n        while (l < r) {\n            if (s.charAt(l) != s.charAt(r)) return (\n                pal(s, l + 1, r) || pal(s, l, r - 1)\n            );\n            l++;\n            r--;\n        }\n        return true;\n    }\n\n    private boolean pal(String s, int l, int r) {\n        while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.validPalindrome(\"radkar\"))throw new AssertionError();if(s.validPalindrome(\"abc\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Valid Palindrome II: what invariant or exchange argument makes the solution correct?",
        "back": "Match inward until the first mismatch. Any successful single deletion must remove one of these two endpoints; test both remaining ranges as ordinary palindromes."
      },
      {
        "type": "Edge case",
        "front": "Valid Palindrome II: what implementation trap should you check before submitting?",
        "back": "Try both deletions at the first mismatch. Greedily choosing only one side can reject a valid answer."
      },
      {
        "type": "Complexity",
        "front": "Valid Palindrome II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-167",
    "number": 167,
    "title": "Two Sum II - Input Array Is Sorted",
    "slug": "two-sum-ii-input-array-is-sorted",
    "difficulty": "Medium",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "context": "Input: a nondecreasing integer array and target with exactly one valid pair. Return the two distinct positions using one-based indices and constant extra space.",
    "examples": "[1,4,6,8], target 10 → [2,3].",
    "solution": "Compare the sum of the smallest and largest remaining values. If too small, the left value cannot pair with any remaining value, so discard it. If too large, discard the right value analogously.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Return one-based indices. Equal values can be used when they occupy different positions.",
    "followUp": "Which assumption allows eliminating an entire endpoint after one sum comparison?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] twoSum(int[] numbers, int target) {\n        int l = 0,\n            r = numbers.length - 1;\n        while (l < r) {\n            int sum = numbers[l] + numbers[r];\n            if (sum == target) return new int[] { l + 1, r + 1 };\n            if (sum < target) l++;\n            else r--;\n        }\n        throw new IllegalArgumentException();\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!Arrays.equals(s.twoSum(new int[]{1,4,6,8},10),new int[]{2,3}))throw new AssertionError();if(!Arrays.equals(s.twoSum(new int[]{3,3},6),new int[]{1,2}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Two Sum II - Input Array Is Sorted: what invariant or exchange argument makes the solution correct?",
        "back": "Compare the sum of the smallest and largest remaining values. If too small, the left value cannot pair with any remaining value, so discard it. If too large, discard the right value analogously."
      },
      {
        "type": "Edge case",
        "front": "Two Sum II - Input Array Is Sorted: what implementation trap should you check before submitting?",
        "back": "Return one-based indices. Equal values can be used when they occupy different positions."
      },
      {
        "type": "Complexity",
        "front": "Two Sum II - Input Array Is Sorted: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-15",
    "number": 15,
    "title": "3Sum",
    "slug": "3sum",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Two pointers",
    "url": "https://leetcode.com/problems/3sum/",
    "context": "Input: an integer array with at least three values, each between -100000 and 100000. Return all distinct value triples summing to zero using three distinct indices. Output order is arbitrary.",
    "examples": "[-2,0,1,1,2] → [[-2,0,2],[-2,1,1]].",
    "solution": "Sort, fix each distinct first value, and solve a two-pointer pair sum in the suffix. Monotonic sums justify pointer moves. Skip equal fixed values and equal endpoint values after a match to emit each value triple once.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(log n) sorting stack, excluding output",
    "pitfall": "Deduplicate values, not indices. Two equal numbers at distinct indices may belong to a valid triple.",
    "followUp": "How does fixing one value reduce 3Sum to the sorted two-sum problem?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> out = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1,\n                r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum < 0) l++;\n                else if (sum > 0) r--;\n                else {\n                    out.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    int a = nums[l],\n                        b = nums[r];\n                    while (l < r && nums[l] == a) l++;\n                    while (l < r && nums[r] == b) r--;\n                }\n            }\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.threeSum(new int[]{-2,0,1,1,2}).equals(Arrays.asList(Arrays.asList(-2,0,2),Arrays.asList(-2,1,1))))throw new AssertionError();if(s.threeSum(new int[]{0,0,0,0}).size()!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "3Sum: what invariant or exchange argument makes the solution correct?",
        "back": "Sort, fix each distinct first value, and solve a two-pointer pair sum in the suffix. Monotonic sums justify pointer moves. Skip equal fixed values and equal endpoint values after a match to emit each value triple once."
      },
      {
        "type": "Edge case",
        "front": "3Sum: what implementation trap should you check before submitting?",
        "back": "Deduplicate values, not indices. Two equal numbers at distinct indices may belong to a valid triple."
      },
      {
        "type": "Complexity",
        "front": "3Sum: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n²). Extra space: O(log n) sorting stack, excluding output."
      }
    ]
  },
  {
    "id": "lc-16",
    "number": 16,
    "title": "3Sum Closest",
    "slug": "3sum-closest",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Two pointers",
    "url": "https://leetcode.com/problems/3sum-closest/",
    "context": "Input: at least three integers and a target; values and target are within the problem bounds so triple sums fit int. Return the sum of a distinct-index triple closest to the target. The answer is guaranteed unique.",
    "examples": "[1,3,6,9], target 12 → 13 from 1+3+9.",
    "solution": "Sort and fix the first index. Move two suffix pointers according to whether the sum is below or above target, recording the smallest absolute difference. Discarded endpoint pairs cannot improve in the direction needed.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(log n) sorting stack",
    "pitfall": "Return the sum, not the distance. Initialize best from an actual triple.",
    "followUp": "How would you define a deterministic tie rule if uniqueness were removed?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int threeSumClosest(int[] nums, int target) {\n        Arrays.sort(nums);\n        int best = nums[0] + nums[1] + nums[2];\n        for (int i = 0; i < nums.length - 2; i++) {\n            int l = i + 1,\n                r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (Math.abs(sum - target) < Math.abs(best - target)) best =\n                    sum;\n                if (sum == target) return sum;\n                if (sum < target) l++;\n                else r--;\n            }\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.threeSumClosest(new int[]{1,3,6,9},12)!=13)throw new AssertionError();if(s.threeSumClosest(new int[]{0,0,0},1)!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "3Sum Closest: what invariant or exchange argument makes the solution correct?",
        "back": "Sort and fix the first index. Move two suffix pointers according to whether the sum is below or above target, recording the smallest absolute difference. Discarded endpoint pairs cannot improve in the direction needed."
      },
      {
        "type": "Edge case",
        "front": "3Sum Closest: what implementation trap should you check before submitting?",
        "back": "Return the sum, not the distance. Initialize best from an actual triple."
      },
      {
        "type": "Complexity",
        "front": "3Sum Closest: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n²). Extra space: O(log n) sorting stack."
      }
    ]
  },
  {
    "id": "lc-18",
    "number": 18,
    "title": "4Sum",
    "slug": "4sum",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Two pointers",
    "url": "https://leetcode.com/problems/4sum/",
    "context": "Input: integers and a target, potentially near ±10^9. Return distinct quadruples of values using four distinct indices whose sum is target. Fewer than four inputs yield an empty result.",
    "examples": "[-2,-1,0,1,2], target 0 → [[-2,-1,1,2]].",
    "solution": "Sort, fix two distinct indices, then use inward pointers on the suffix. Skip repeated values at each fixed level and after each match. Use long for the sum so comparisons preserve their meaning.",
    "timeComplexity": "O(n³)",
    "spaceComplexity": "O(log n) sorting stack, excluding output",
    "pitfall": "Cast before adding: casting an already overflowed int sum does not recover the correct result.",
    "followUp": "How can minimum and maximum possible sums prune the fixed-index loops?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        Arrays.sort(nums);\n        List<List<Integer>> out = new ArrayList<>();\n        for (int i = 0; i < nums.length - 3; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            for (int j = i + 1; j < nums.length - 2; j++) {\n                if (j > i + 1 && nums[j] == nums[j - 1]) continue;\n                int l = j + 1,\n                    r = nums.length - 1;\n                while (l < r) {\n                    long sum = (long) nums[i] + nums[j] + nums[l] + nums[r];\n                    if (sum < target) l++;\n                    else if (sum > target) r--;\n                    else {\n                        out.add(\n                            Arrays.asList(nums[i], nums[j], nums[l], nums[r])\n                        );\n                        int a = nums[l],\n                            b = nums[r];\n                        while (l < r && nums[l] == a) l++;\n                        while (l < r && nums[r] == b) r--;\n                    }\n                }\n            }\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.fourSum(new int[]{-2,-1,0,1,2},0).equals(Arrays.asList(Arrays.asList(-2,-1,1,2))))throw new AssertionError();if(!s.fourSum(new int[]{1000000000,1000000000,1000000000,1000000000},-294967296).isEmpty())throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "4Sum: what invariant or exchange argument makes the solution correct?",
        "back": "Sort, fix two distinct indices, then use inward pointers on the suffix. Skip repeated values at each fixed level and after each match. Use long for the sum so comparisons preserve their meaning."
      },
      {
        "type": "Edge case",
        "front": "4Sum: what implementation trap should you check before submitting?",
        "back": "Cast before adding: casting an already overflowed int sum does not recover the correct result."
      },
      {
        "type": "Complexity",
        "front": "4Sum: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n³). Extra space: O(log n) sorting stack, excluding output."
      }
    ]
  },
  {
    "id": "lc-11",
    "number": 11,
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "difficulty": "Medium",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/container-with-most-water/",
    "context": "Input: at least two nonnegative heights at unit-spaced x coordinates. Choose two vertical lines and return the maximum container area; area is their separation times the shorter height.",
    "examples": "[3,1,4,2] → 6 using positions 0 and 3.",
    "solution": "Start at the outermost pair and record its area. Move the shorter line inward: retaining that line while reducing width cannot improve this pair. This safely removes every inferior pair containing that endpoint.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The container is limited by the shorter wall, not the sum of heights. This is not the trapped-water problem.",
    "followUp": "Why is moving the taller endpoint alone not a safe elimination?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxArea(int[] height) {\n        int l = 0,\n            r = height.length - 1,\n            best = 0;\n        while (l < r) {\n            best = Math.max(best, (r - l) * Math.min(height[l], height[r]));\n            if (height[l] <= height[r]) l++;\n            else r--;\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.maxArea(new int[]{3,1,4,2})!=6)throw new AssertionError();if(s.maxArea(new int[]{1,1})!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Container With Most Water: what invariant or exchange argument makes the solution correct?",
        "back": "Start at the outermost pair and record its area. Move the shorter line inward: retaining that line while reducing width cannot improve this pair. This safely removes every inferior pair containing that endpoint."
      },
      {
        "type": "Edge case",
        "front": "Container With Most Water: what implementation trap should you check before submitting?",
        "back": "The container is limited by the shorter wall, not the sum of heights. This is not the trapped-water problem."
      },
      {
        "type": "Complexity",
        "front": "Container With Most Water: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-42",
    "number": 42,
    "title": "Trapping Rain Water",
    "slug": "trapping-rain-water",
    "difficulty": "Hard",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/trapping-rain-water/",
    "context": "Input: nonnegative bar heights with unit widths. Return the total water trapped between bars after rain. There are at most 20000 bars of height at most 100000.",
    "examples": "[3,0,2,0,4] → 7: depths 3,1,3 at the interior positions.",
    "solution": "Track left and right maxima while moving the side with the smaller current height. That side has a sufficient opposite boundary, so its water depth is determined by its running maximum. Each position is finalized once.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Add boundaryMaximum-height only after updating the boundary maximum, preventing negative water.",
    "followUp": "How does a prefix/suffix-max solution explain the two-pointer optimization?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int trap(int[] height) {\n        int l = 0,\n            r = height.length - 1,\n            lm = 0,\n            rm = 0,\n            water = 0;\n        while (l <= r) {\n            if (height[l] <= height[r]) {\n                lm = Math.max(lm, height[l]);\n                water += lm - height[l++];\n            } else {\n                rm = Math.max(rm, height[r]);\n                water += rm - height[r--];\n            }\n        }\n        return water;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.trap(new int[]{3,0,2,0,4})!=7)throw new AssertionError();if(s.trap(new int[]{1,2,3})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Trapping Rain Water: what invariant or exchange argument makes the solution correct?",
        "back": "Track left and right maxima while moving the side with the smaller current height. That side has a sufficient opposite boundary, so its water depth is determined by its running maximum. Each position is finalized once."
      },
      {
        "type": "Edge case",
        "front": "Trapping Rain Water: what implementation trap should you check before submitting?",
        "back": "Add boundaryMaximum-height only after updating the boundary maximum, preventing negative water."
      },
      {
        "type": "Complexity",
        "front": "Trapping Rain Water: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-977",
    "number": 977,
    "title": "Squares of a Sorted Array",
    "slug": "squares-of-a-sorted-array",
    "difficulty": "Easy",
    "tags": "Array, Two pointers",
    "url": "https://leetcode.com/problems/squares-of-a-sorted-array/",
    "context": "Input: nondecreasing integers with magnitudes at most 10000. Return their squares in nondecreasing order in linear time.",
    "examples": "[-5,-1,2,4] → [1,4,16,25].",
    "solution": "The largest remaining absolute value lies at an endpoint. Compare endpoint squares and fill the output from right to left, removing the larger endpoint each time.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n) output; O(1) auxiliary",
    "pitfall": "Squaring preserves order among nonnegatives but reverses order among negatives.",
    "followUp": "Could you merge squares from the negative and nonnegative portions instead?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] sortedSquares(int[] nums) {\n        int[] out = new int[nums.length];\n        int l = 0,\n            r = nums.length - 1;\n        for (int w = r; w >= 0; w--) {\n            int a = nums[l] * nums[l],\n                b = nums[r] * nums[r];\n            if (a > b) {\n                out[w] = a;\n                l++;\n            } else {\n                out[w] = b;\n                r--;\n            }\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!Arrays.equals(s.sortedSquares(new int[]{-5,-1,2,4}),new int[]{1,4,16,25}))throw new AssertionError();if(!Arrays.equals(s.sortedSquares(new int[]{-3,-2}),new int[]{4,9}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Squares of a Sorted Array: what invariant or exchange argument makes the solution correct?",
        "back": "The largest remaining absolute value lies at an endpoint. Compare endpoint squares and fill the output from right to left, removing the larger endpoint each time."
      },
      {
        "type": "Edge case",
        "front": "Squares of a Sorted Array: what implementation trap should you check before submitting?",
        "back": "Squaring preserves order among nonnegatives but reverses order among negatives."
      },
      {
        "type": "Complexity",
        "front": "Squares of a Sorted Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(n) output; O(1) auxiliary."
      }
    ]
  },
  {
    "id": "lc-344",
    "number": 344,
    "title": "Reverse String",
    "slug": "reverse-string",
    "difficulty": "Easy",
    "tags": "String, Two pointers",
    "url": "https://leetcode.com/problems/reverse-string/",
    "context": "Input: a mutable character array. Reverse its characters in place using constant extra memory; return no separate array.",
    "examples": "[c,o,d,e] → [e,d,o,c].",
    "solution": "Swap symmetric endpoints and move inward. After each swap, both endpoint characters are in their final positions; the unprocessed interval strictly shrinks.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Stop when left meets right so the middle character of an odd-length input stays in place.",
    "followUp": "How would reversing words differ from reversing individual characters?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void reverseString(char[] s) {\n        int l = 0,\n            r = s.length - 1;\n        while (l < r) {\n            char t = s[l];\n            s[l++] = s[r];\n            s[r--] = t;\n        }\n    }\n}\n",
    "testCode": "Solution s=new Solution();char[]a=\"code\".toCharArray();s.reverseString(a);if(!new String(a).equals(\"edoc\"))throw new AssertionError();char[]b={'x'};s.reverseString(b);if(b[0]!='x')throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reverse String: what invariant or exchange argument makes the solution correct?",
        "back": "Swap symmetric endpoints and move inward. After each swap, both endpoint characters are in their final positions; the unprocessed interval strictly shrinks."
      },
      {
        "type": "Edge case",
        "front": "Reverse String: what implementation trap should you check before submitting?",
        "back": "Stop when left meets right so the middle character of an odd-length input stays in place."
      },
      {
        "type": "Complexity",
        "front": "Reverse String: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-345",
    "number": 345,
    "title": "Reverse Vowels of a String",
    "slug": "reverse-vowels-of-a-string",
    "difficulty": "Easy",
    "tags": "String, Two pointers",
    "url": "https://leetcode.com/problems/reverse-vowels-of-a-string/",
    "context": "Input: a string. Reverse only the positions occupied by English vowels a,e,i,o,u in either case, preserving all other characters and the case of moved characters. Return the resulting string.",
    "examples": "\"Leet\" → \"Leet\"; \"coding\" → \"cidong\".",
    "solution": "Scan inward to the next vowel at each end, then swap those two vowels. Nonvowel positions never move; each vowel pair reaches its final reversed position.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n) mutable character copy",
    "pitfall": "Uppercase vowels must be recognized. Do not lowercase the output itself.",
    "followUp": "Can you reverse only a caller-supplied set of characters with the same structure?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String reverseVowels(String s) {\n        char[] a = s.toCharArray();\n        int l = 0,\n            r = a.length - 1;\n        while (l < r) {\n            while (l < r && !vowel(a[l])) l++;\n            while (l < r && !vowel(a[r])) r--;\n            char t = a[l];\n            a[l++] = a[r];\n            a[r--] = t;\n        }\n        return new String(a);\n    }\n\n    private boolean vowel(char c) {\n        return \"aeiouAEIOU\".indexOf(c) >= 0;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.reverseVowels(\"coding\").equals(\"cidong\"))throw new AssertionError();if(!s.reverseVowels(\"aE\").equals(\"Ea\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reverse Vowels of a String: what invariant or exchange argument makes the solution correct?",
        "back": "Scan inward to the next vowel at each end, then swap those two vowels. Nonvowel positions never move; each vowel pair reaches its final reversed position."
      },
      {
        "type": "Edge case",
        "front": "Reverse Vowels of a String: what implementation trap should you check before submitting?",
        "back": "Uppercase vowels must be recognized. Do not lowercase the output itself."
      },
      {
        "type": "Complexity",
        "front": "Reverse Vowels of a String: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(n) mutable character copy."
      }
    ]
  },
  {
    "id": "lc-443",
    "number": 443,
    "title": "String Compression",
    "slug": "string-compression",
    "difficulty": "Medium",
    "tags": "String, Two pointers",
    "url": "https://leetcode.com/problems/string-compression/",
    "context": "Input: a mutable character array. Replace each consecutive run by its character followed by the decimal count only when the count exceeds one. Return the new prefix length, using constant auxiliary space.",
    "examples": "aaabbc → a3b2c, length 5; a single x remains x.",
    "solution": "Read one maximal run at a time and write its character and count to the front. Encoded runs never exceed their original lengths, so writing cannot overtake unread input.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1), bounded count digits",
    "pitfall": "Counts of ten or more occupy multiple characters. Return the written length, not a new string.",
    "followUp": "Why is it safe to compress in the same array while scanning forward?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int compress(char[] chars) {\n        int r = 0,\n            w = 0;\n        while (r < chars.length) {\n            int start = r;\n            char c = chars[r];\n            while (r < chars.length && chars[r] == c) r++;\n            chars[w++] = c;\n            int count = r - start;\n            if (count > 1) for (char d : Integer.toString(count).toCharArray())\n                chars[w++] = d;\n        }\n        return w;\n    }\n}\n",
    "testCode": "Solution s=new Solution();char[]a=\"aaabbc\".toCharArray();int n=s.compress(a);if(n!=5||!new String(a,0,n).equals(\"a3b2c\"))throw new AssertionError();char[]b=\"xxxxxxxxxxxx\".toCharArray();if(s.compress(b)!=3||!new String(b,0,3).equals(\"x12\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "String Compression: what invariant or exchange argument makes the solution correct?",
        "back": "Read one maximal run at a time and write its character and count to the front. Encoded runs never exceed their original lengths, so writing cannot overtake unread input."
      },
      {
        "type": "Edge case",
        "front": "String Compression: what implementation trap should you check before submitting?",
        "back": "Counts of ten or more occupy multiple characters. Return the written length, not a new string."
      },
      {
        "type": "Complexity",
        "front": "String Compression: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1), bounded count digits."
      }
    ]
  },
  {
    "id": "lc-3",
    "number": 3,
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "difficulty": "Medium",
    "tags": "String, Sliding window",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "context": "Input: a string of English letters, digits, symbols, and spaces, possibly empty. Return the maximum length of a contiguous substring with no repeated characters.",
    "examples": "\"abcaef\" → 5 from \"bcaef\".",
    "solution": "Track the last index of each character and a left boundary. On seeing a repeated character, move left past its previous occurrence only if that occurrence is inside the window. The current window remains duplicate-free.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(alphabet size)",
    "pitfall": "Never move left backward when a repeated character lies before the window; use max(left,last+1).",
    "followUp": "Why does the input abba expose a backward-left-pointer bug?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> last = new HashMap<>();\n        int l = 0,\n            best = 0;\n        for (int r = 0; r < s.length(); r++) {\n            char c = s.charAt(r);\n            l = Math.max(l, last.getOrDefault(c, -1) + 1);\n            last.put(c, r);\n            best = Math.max(best, r - l + 1);\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.lengthOfLongestSubstring(\"abcaef\")!=5)throw new AssertionError();if(s.lengthOfLongestSubstring(\"abba\")!=2)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Substring Without Repeating Characters: what invariant or exchange argument makes the solution correct?",
        "back": "Track the last index of each character and a left boundary. On seeing a repeated character, move left past its previous occurrence only if that occurrence is inside the window. The current window remains duplicate-free."
      },
      {
        "type": "Edge case",
        "front": "Longest Substring Without Repeating Characters: what implementation trap should you check before submitting?",
        "back": "Never move left backward when a repeated character lies before the window; use max(left,last+1)."
      },
      {
        "type": "Complexity",
        "front": "Longest Substring Without Repeating Characters: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(alphabet size)."
      }
    ]
  },
  {
    "id": "lc-76",
    "number": 76,
    "title": "Minimum Window Substring",
    "slug": "minimum-window-substring",
    "difficulty": "Hard",
    "tags": "String, Sliding window",
    "url": "https://leetcode.com/problems/minimum-window-substring/",
    "context": "Input: nonempty source and target strings of English letters, including both cases. Return the shortest source substring covering every target occurrence, including duplicates. Return an empty string if impossible; the answer is unique.",
    "examples": "source \"cabefab\", target \"aab\" → \"abefa\".",
    "solution": "Maintain deficit counts and the total number of target occurrences still missing. Expand until missing is zero, then shrink while valid and record shorter windows. Removing a required occurrence makes the window invalid and triggers expansion again.",
    "timeComplexity": "O(source length + target length)",
    "spaceComplexity": "O(1), ASCII counters",
    "pitfall": "Repeated target letters are separate requirements. A set of required characters is insufficient.",
    "followUp": "Why does each left endpoint move at most once despite the nested loop?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String minWindow(String s, String t) {\n        int[] need = new int[128];\n        for (char c : t.toCharArray()) need[c]++;\n        int missing = t.length(),\n            l = 0,\n            start = 0,\n            best = Integer.MAX_VALUE;\n        for (int r = 0; r < s.length(); r++) {\n            if (need[s.charAt(r)]-- > 0) missing--;\n            while (missing == 0) {\n                if (r - l + 1 < best) {\n                    best = r - l + 1;\n                    start = l;\n                }\n                if (++need[s.charAt(l++)] > 0) missing++;\n            }\n        }\n        return best == Integer.MAX_VALUE\n            ? \"\"\n            : s.substring(start, start + best);\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.minWindow(\"cabefab\",\"aab\").equals(\"abefa\"))throw new AssertionError();if(!s.minWindow(\"a\",\"aa\").equals(\"\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Window Substring: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain deficit counts and the total number of target occurrences still missing. Expand until missing is zero, then shrink while valid and record shorter windows. Removing a required occurrence makes the window invalid and triggers expansion again."
      },
      {
        "type": "Edge case",
        "front": "Minimum Window Substring: what implementation trap should you check before submitting?",
        "back": "Repeated target letters are separate requirements. A set of required characters is insufficient."
      },
      {
        "type": "Complexity",
        "front": "Minimum Window Substring: state the time and extra-space costs of this implementation.",
        "back": "Time: O(source length + target length). Extra space: O(1), ASCII counters."
      }
    ]
  },
  {
    "id": "lc-424",
    "number": 424,
    "title": "Longest Repeating Character Replacement",
    "slug": "longest-repeating-character-replacement",
    "difficulty": "Medium",
    "tags": "String, Sliding window",
    "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "context": "Input: an uppercase-English string and a nonnegative replacement budget k. Return the greatest substring length that can become one repeated letter after changing at most k characters.",
    "examples": "\"ABABA\", k=1 → 3; any length-4 window needs two changes.",
    "solution": "Keep a window and its letter counts. It is feasible exactly when window length minus its largest letter count is at most k. Recompute that largest count over the fixed 26-letter alphabet while shrinking to preserve an exactly valid window.",
    "timeComplexity": "O(26n), hence O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The most frequent letter may change after removing the left endpoint; this implementation recomputes it to keep the invariant exact.",
    "followUp": "How does the stale-maximum optimization differ from maintaining an exactly valid current window?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int characterReplacement(String s, int k) {\n        int[] c = new int[26];\n        int l = 0,\n            best = 0;\n        for (int r = 0; r < s.length(); r++) {\n            c[s.charAt(r) - 'A']++;\n            while (r - l + 1 - max(c) > k) c[s.charAt(l++) - 'A']--;\n            best = Math.max(best, r - l + 1);\n        }\n        return best;\n    }\n\n    private int max(int[] c) {\n        int v = 0;\n        for (int x : c) v = Math.max(v, x);\n        return v;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.characterReplacement(\"ABABA\",1)!=3)throw new AssertionError();if(s.characterReplacement(\"AAAA\",0)!=4)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Repeating Character Replacement: what invariant or exchange argument makes the solution correct?",
        "back": "Keep a window and its letter counts. It is feasible exactly when window length minus its largest letter count is at most k. Recompute that largest count over the fixed 26-letter alphabet while shrinking to preserve an exactly valid window."
      },
      {
        "type": "Edge case",
        "front": "Longest Repeating Character Replacement: what implementation trap should you check before submitting?",
        "back": "The most frequent letter may change after removing the left endpoint; this implementation recomputes it to keep the invariant exact."
      },
      {
        "type": "Complexity",
        "front": "Longest Repeating Character Replacement: state the time and extra-space costs of this implementation.",
        "back": "Time: O(26n), hence O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-567",
    "number": 567,
    "title": "Permutation in String",
    "slug": "permutation-in-string",
    "difficulty": "Medium",
    "tags": "String, Sliding window",
    "url": "https://leetcode.com/problems/permutation-in-string/",
    "context": "Input: lowercase strings s1 and s2. Return whether a contiguous substring of s2 is a permutation of all characters in s1. Multiplicities matter.",
    "examples": "s1=\"ac\", s2=\"xxcayy\" → true from ca.",
    "solution": "Maintain counts for a fixed window of length s1 in s2. Add the entering character and remove the leaving one. Equal 26-letter count vectors mean the window is an anagram.",
    "timeComplexity": "O(26n+m), hence O(n+m)",
    "spaceComplexity": "O(1)",
    "pitfall": "The window length must equal s1.length; a larger window containing the letters does not qualify.",
    "followUp": "How can a mismatch counter avoid comparing all 26 counts after each shift?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean checkInclusion(String s1, String s2) {\n        int[] need = new int[26],\n            win = new int[26];\n        for (char c : s1.toCharArray()) need[c - 'a']++;\n        for (int r = 0; r < s2.length(); r++) {\n            win[s2.charAt(r) - 'a']++;\n            if (r >= s1.length()) win[s2.charAt(r - s1.length()) - 'a']--;\n            if (r + 1 >= s1.length() && Arrays.equals(need, win)) return true;\n        }\n        return false;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.checkInclusion(\"ac\",\"xxcayy\"))throw new AssertionError();if(s.checkInclusion(\"aa\",\"ab\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Permutation in String: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain counts for a fixed window of length s1 in s2. Add the entering character and remove the leaving one. Equal 26-letter count vectors mean the window is an anagram."
      },
      {
        "type": "Edge case",
        "front": "Permutation in String: what implementation trap should you check before submitting?",
        "back": "The window length must equal s1.length; a larger window containing the letters does not qualify."
      },
      {
        "type": "Complexity",
        "front": "Permutation in String: state the time and extra-space costs of this implementation.",
        "back": "Time: O(26n+m), hence O(n+m). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-438",
    "number": 438,
    "title": "Find All Anagrams in a String",
    "slug": "find-all-anagrams-in-a-string",
    "difficulty": "Medium",
    "tags": "String, Sliding window",
    "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    "context": "Input: lowercase source s and nonempty pattern p. Return every starting index of a length-p substring that has exactly the same letter counts as p. Overlapping matches count.",
    "examples": "s=\"abab\", p=\"ab\" → [0,1,2].",
    "solution": "Slide a fixed-size frequency window through s. Once it has p.length characters, compare its counts with the pattern and record the window start on equality. Update one entering and one leaving letter per shift.",
    "timeComplexity": "O(26n+m), hence O(n+m)",
    "spaceComplexity": "O(1) excluding output",
    "pitfall": "Do not skip ahead after a match: valid windows can overlap.",
    "followUp": "How would the result differ from finding nonoverlapping occurrences of the literal pattern?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> findAnagrams(String s, String p) {\n        int[] need = new int[26],\n            win = new int[26];\n        for (char c : p.toCharArray()) need[c - 'a']++;\n        List<Integer> out = new ArrayList<>();\n        for (int r = 0; r < s.length(); r++) {\n            win[s.charAt(r) - 'a']++;\n            if (r >= p.length()) win[s.charAt(r - p.length()) - 'a']--;\n            if (r + 1 >= p.length() && Arrays.equals(need, win)) out.add(\n                r - p.length() + 1\n            );\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.findAnagrams(\"abab\",\"ab\").equals(Arrays.asList(0,1,2)))throw new AssertionError();if(!s.findAnagrams(\"a\",\"aa\").isEmpty())throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find All Anagrams in a String: what invariant or exchange argument makes the solution correct?",
        "back": "Slide a fixed-size frequency window through s. Once it has p.length characters, compare its counts with the pattern and record the window start on equality. Update one entering and one leaving letter per shift."
      },
      {
        "type": "Edge case",
        "front": "Find All Anagrams in a String: what implementation trap should you check before submitting?",
        "back": "Do not skip ahead after a match: valid windows can overlap."
      },
      {
        "type": "Complexity",
        "front": "Find All Anagrams in a String: state the time and extra-space costs of this implementation.",
        "back": "Time: O(26n+m), hence O(n+m). Extra space: O(1) excluding output."
      }
    ]
  },
  {
    "id": "lc-209",
    "number": 209,
    "title": "Minimum Size Subarray Sum",
    "slug": "minimum-size-subarray-sum",
    "difficulty": "Medium",
    "tags": "Array, Sliding window",
    "url": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "context": "Input: positive integers and a positive target. Return the minimum length of a contiguous segment whose sum is at least target, or zero if none exists.",
    "examples": "[1,4,2,3], target 6 → 2 from [4,2].",
    "solution": "Expand the right endpoint and add its value. While the sum meets the target, record the length and remove from the left. Positivity makes shrinking decrease the sum, so the first invalid state ends useful shrinking.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The positivity assumption is essential. Negative values can make shrinking increase the sum and invalidate this reasoning.",
    "followUp": "Why is this algorithm not correct for arbitrary signed arrays?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minSubArrayLen(int target, int[] nums) {\n        int l = 0,\n            best = Integer.MAX_VALUE;\n        long sum = 0;\n        for (int r = 0; r < nums.length; r++) {\n            sum += nums[r];\n            while (sum >= target) {\n                best = Math.min(best, r - l + 1);\n                sum -= nums[l++];\n            }\n        }\n        return best == Integer.MAX_VALUE ? 0 : best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.minSubArrayLen(6,new int[]{1,4,2,3})!=2)throw new AssertionError();if(s.minSubArrayLen(20,new int[]{1,4})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Size Subarray Sum: what invariant or exchange argument makes the solution correct?",
        "back": "Expand the right endpoint and add its value. While the sum meets the target, record the length and remove from the left. Positivity makes shrinking decrease the sum, so the first invalid state ends useful shrinking."
      },
      {
        "type": "Edge case",
        "front": "Minimum Size Subarray Sum: what implementation trap should you check before submitting?",
        "back": "The positivity assumption is essential. Negative values can make shrinking increase the sum and invalidate this reasoning."
      },
      {
        "type": "Complexity",
        "front": "Minimum Size Subarray Sum: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-713",
    "number": 713,
    "title": "Subarray Product Less Than K",
    "slug": "subarray-product-less-than-k",
    "difficulty": "Medium",
    "tags": "Array, Sliding window",
    "url": "https://leetcode.com/problems/subarray-product-less-than-k/",
    "context": "Input: positive integers up to 1000 and nonnegative k up to 10^6. Count nonempty contiguous subarrays whose product is strictly less than k.",
    "examples": "[2,3,4], k=10 → 4: three singletons and [2,3].",
    "solution": "Maintain the longest valid window ending at right by dividing away left values while product>=k. Every suffix of this positive-integer window is also valid, contributing right-left+1 new subarrays.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Return zero immediately for k<=1. Strict inequality means product equal to k is invalid.",
    "followUp": "Why can all valid subarrays ending at one index be counted without enumerating them?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numSubarrayProductLessThanK(int[] nums, int k) {\n        if (k <= 1) return 0;\n        long product = 1;\n        int l = 0,\n            ans = 0;\n        for (int r = 0; r < nums.length; r++) {\n            product *= nums[r];\n            while (product >= k) product /= nums[l++];\n            ans += r - l + 1;\n        }\n        return ans;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.numSubarrayProductLessThanK(new int[]{2,3,4},10)!=4)throw new AssertionError();if(s.numSubarrayProductLessThanK(new int[]{1,1},1)!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Subarray Product Less Than K: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain the longest valid window ending at right by dividing away left values while product>=k. Every suffix of this positive-integer window is also valid, contributing right-left+1 new subarrays."
      },
      {
        "type": "Edge case",
        "front": "Subarray Product Less Than K: what implementation trap should you check before submitting?",
        "back": "Return zero immediately for k<=1. Strict inequality means product equal to k is invalid."
      },
      {
        "type": "Complexity",
        "front": "Subarray Product Less Than K: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-1004",
    "number": 1004,
    "title": "Max Consecutive Ones III",
    "slug": "max-consecutive-ones-iii",
    "difficulty": "Medium",
    "tags": "Array, Sliding window",
    "url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "context": "Input: a binary array and a nonnegative k. Return the longest contiguous segment that can consist entirely of ones after flipping at most k zeros.",
    "examples": "[1,0,1,0,1], k=1 → 3.",
    "solution": "Count zeros in the current window. Expand right, then move left until at most k zeros remain. The resulting longest valid window ending at right is a candidate for the answer.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Count zeros, not the number of runs of zeros; each zero consumes one flip.",
    "followUp": "How does this become a general longest-window-with-at-most-k-bad-items template?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int longestOnes(int[] nums, int k) {\n        int l = 0,\n            z = 0,\n            best = 0;\n        for (int r = 0; r < nums.length; r++) {\n            if (nums[r] == 0) z++;\n            while (z > k) if (nums[l++] == 0) z--;\n            best = Math.max(best, r - l + 1);\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.longestOnes(new int[]{1,0,1,0,1},1)!=3)throw new AssertionError();if(s.longestOnes(new int[]{0,0},0)!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Max Consecutive Ones III: what invariant or exchange argument makes the solution correct?",
        "back": "Count zeros in the current window. Expand right, then move left until at most k zeros remain. The resulting longest valid window ending at right is a candidate for the answer."
      },
      {
        "type": "Edge case",
        "front": "Max Consecutive Ones III: what implementation trap should you check before submitting?",
        "back": "Count zeros, not the number of runs of zeros; each zero consumes one flip."
      },
      {
        "type": "Complexity",
        "front": "Max Consecutive Ones III: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-904",
    "number": 904,
    "title": "Fruit Into Baskets",
    "slug": "fruit-into-baskets",
    "difficulty": "Medium",
    "tags": "Array, Sliding window, Hash map",
    "url": "https://leetcode.com/problems/fruit-into-baskets/",
    "context": "Input: fruit types listed in tree order. Starting anywhere, collect one fruit from each consecutive tree until you would need more than two fruit types. Return the maximum number collected.",
    "examples": "[1,2,1,3,3] → 3; [2,1,2] is another valid three-tree pattern.",
    "solution": "Maintain a frequency map for the window and shrink until it contains at most two distinct keys. The window then models exactly the two available baskets, and its length is the collected count.",
    "timeComplexity": "O(n) expected",
    "spaceComplexity": "O(1), at most three transient types",
    "pitfall": "Remove keys when their counts reach zero; otherwise map size overstates the number of active types.",
    "followUp": "How would you generalize from two baskets to k baskets?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int totalFruit(int[] fruits) {\n        Map<Integer, Integer> c = new HashMap<>();\n        int l = 0,\n            best = 0;\n        for (int r = 0; r < fruits.length; r++) {\n            c.merge(fruits[r], 1, Integer::sum);\n            while (c.size() > 2) {\n                int x = fruits[l++];\n                int v = c.get(x) - 1;\n                if (v == 0) c.remove(x);\n                else c.put(x, v);\n            }\n            best = Math.max(best, r - l + 1);\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.totalFruit(new int[]{1,2,1,3,3})!=3)throw new AssertionError();if(s.totalFruit(new int[]{7,7,7,7})!=4)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Fruit Into Baskets: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain a frequency map for the window and shrink until it contains at most two distinct keys. The window then models exactly the two available baskets, and its length is the collected count."
      },
      {
        "type": "Edge case",
        "front": "Fruit Into Baskets: what implementation trap should you check before submitting?",
        "back": "Remove keys when their counts reach zero; otherwise map size overstates the number of active types."
      },
      {
        "type": "Complexity",
        "front": "Fruit Into Baskets: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n) expected. Extra space: O(1), at most three transient types."
      }
    ]
  },
  {
    "id": "lc-1456",
    "number": 1456,
    "title": "Maximum Number of Vowels in a Substring of Given Length",
    "slug": "maximum-number-of-vowels-in-a-substring-of-given-length",
    "difficulty": "Medium",
    "tags": "String, Sliding window",
    "url": "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
    "context": "Input: a lowercase-English string and k between 1 and its length. Return the largest number of a,e,i,o,u occurring in any substring of exactly k characters.",
    "examples": "\"education\", k=3 → 2.",
    "solution": "Keep the vowel count in a fixed-length sliding window. Add the entering character contribution and subtract the leaving contribution. After the first full window, maximize this exact count.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Do not compare partial windows before k characters have arrived.",
    "followUp": "When can the algorithm stop early with a proven optimal result?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxVowels(String s, int k) {\n        int count = 0,\n            best = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (v(s.charAt(i))) count++;\n            if (i >= k && v(s.charAt(i - k))) count--;\n            if (i >= k - 1) best = Math.max(best, count);\n        }\n        return best;\n    }\n\n    private boolean v(char c) {\n        return \"aeiou\".indexOf(c) >= 0;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.maxVowels(\"education\",3)!=2)throw new AssertionError();if(s.maxVowels(\"rhythm\",2)!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximum Number of Vowels in a Substring of Given Length: what invariant or exchange argument makes the solution correct?",
        "back": "Keep the vowel count in a fixed-length sliding window. Add the entering character contribution and subtract the leaving contribution. After the first full window, maximize this exact count."
      },
      {
        "type": "Edge case",
        "front": "Maximum Number of Vowels in a Substring of Given Length: what implementation trap should you check before submitting?",
        "back": "Do not compare partial windows before k characters have arrived."
      },
      {
        "type": "Complexity",
        "front": "Maximum Number of Vowels in a Substring of Given Length: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-643",
    "number": 643,
    "title": "Maximum Average Subarray I",
    "slug": "maximum-average-subarray-i",
    "difficulty": "Easy",
    "tags": "Array, Sliding window",
    "url": "https://leetcode.com/problems/maximum-average-subarray-i/",
    "context": "Input: signed integers and k between 1 and array length. Return the greatest average among all contiguous length-k subarrays. The answer is a floating-point value.",
    "examples": "[-4,2,6,0], k=2 → 4.0 from [2,6].",
    "solution": "Every candidate has the same denominator k, so maximize its sum. Compute the first sum, then add one entering and subtract one leaving value per shift. Divide the maximum by k using floating-point arithmetic.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Initialize best from the first real window, not zero, because all sums may be negative.",
    "followUp": "Why does maximizing sum fail to maximize average when window lengths differ?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public double findMaxAverage(int[] nums, int k) {\n        long sum = 0;\n        for (int i = 0; i < k; i++) sum += nums[i];\n        long best = sum;\n        for (int i = k; i < nums.length; i++) {\n            sum += nums[i] - nums[i - k];\n            best = Math.max(best, sum);\n        }\n        return (double) best / k;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findMaxAverage(new int[]{-4,2,6,0},2)!=4.0)throw new AssertionError();if(s.findMaxAverage(new int[]{-5,-3},2)!=-4.0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximum Average Subarray I: what invariant or exchange argument makes the solution correct?",
        "back": "Every candidate has the same denominator k, so maximize its sum. Compute the first sum, then add one entering and subtract one leaving value per shift. Divide the maximum by k using floating-point arithmetic."
      },
      {
        "type": "Edge case",
        "front": "Maximum Average Subarray I: what implementation trap should you check before submitting?",
        "back": "Initialize best from the first real window, not zero, because all sums may be negative."
      },
      {
        "type": "Complexity",
        "front": "Maximum Average Subarray I: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-704",
    "number": 704,
    "title": "Binary Search",
    "slug": "binary-search",
    "difficulty": "Easy",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/binary-search/",
    "context": "Input: a strictly increasing integer array and target. Return its zero-based index if present, otherwise -1, in logarithmic time.",
    "examples": "[2,5,8,11], target 8 → 2; target 6 → -1.",
    "solution": "Maintain a closed candidate interval [left,right]. Compare its midpoint with target and discard the half whose values cannot match. If the interval becomes empty, the target is absent.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Use left+(right-left)/2 and update by mid±1 so each iteration shrinks the closed interval.",
    "followUp": "How does a half-open interval implementation change the loop condition?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int search(int[] nums, int target) {\n        int l = 0,\n            r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.search(new int[]{2,5,8,11},8)!=2)throw new AssertionError();if(s.search(new int[]{2,5,8,11},6)!=-1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Search: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain a closed candidate interval [left,right]. Compare its midpoint with target and discard the half whose values cannot match. If the interval becomes empty, the target is absent."
      },
      {
        "type": "Edge case",
        "front": "Binary Search: what implementation trap should you check before submitting?",
        "back": "Use left+(right-left)/2 and update by mid±1 so each iteration shrinks the closed interval."
      },
      {
        "type": "Complexity",
        "front": "Binary Search: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-35",
    "number": 35,
    "title": "Search Insert Position",
    "slug": "search-insert-position",
    "difficulty": "Easy",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/search-insert-position/",
    "context": "Input: a strictly increasing integer array and target. Return its position if present, or the index where inserting it would preserve order. The answer may equal array length.",
    "examples": "[2,5,8], target 6 → 2; target 10 → 3.",
    "solution": "Find the first index with value at least target using a half-open interval [left,right). Values before left are smaller; values at or after right are large enough. Their meeting point is the insertion position.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Initialize right to n, not n-1, so insertion after the last value is representable.",
    "followUp": "How would you find the insertion point after all copies of the target?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int searchInsert(int[] nums, int target) {\n        int l = 0,\n            r = nums.length;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] < target) l = m + 1;\n            else r = m;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.searchInsert(new int[]{2,5,8},6)!=2)throw new AssertionError();if(s.searchInsert(new int[]{2,5,8},10)!=3)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Search Insert Position: what invariant or exchange argument makes the solution correct?",
        "back": "Find the first index with value at least target using a half-open interval [left,right). Values before left are smaller; values at or after right are large enough. Their meeting point is the insertion position."
      },
      {
        "type": "Edge case",
        "front": "Search Insert Position: what implementation trap should you check before submitting?",
        "back": "Initialize right to n, not n-1, so insertion after the last value is representable."
      },
      {
        "type": "Complexity",
        "front": "Search Insert Position: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-34",
    "number": 34,
    "title": "Find First and Last Position of Element in Sorted Array",
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "difficulty": "Medium",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "context": "Input: a nondecreasing integer array, possibly empty, and a target. Return the first and last target indices or [-1,-1] if absent. Require logarithmic time.",
    "examples": "[1,4,4,4,9], target 4 → [1,3].",
    "solution": "Binary-search the first value >=target and the first value >target. If the first boundary contains target, the inclusive answer ends one before the second boundary.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Avoid searching for target+1 because target may be Integer.MAX_VALUE. Change the comparison instead.",
    "followUp": "Why does finding any occurrence and expanding linearly violate the requested bound?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] searchRange(int[] nums, int target) {\n        int a = bound(nums, target, false);\n        if (a == nums.length || nums[a] != target) return new int[] { -1, -1 };\n        return new int[] { a, bound(nums, target, true) - 1 };\n    }\n\n    private int bound(int[] a, int t, boolean upper) {\n        int l = 0,\n            r = a.length;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (a[m] < t || (upper && a[m] == t)) l = m + 1;\n            else r = m;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!Arrays.equals(s.searchRange(new int[]{1,4,4,4,9},4),new int[]{1,3}))throw new AssertionError();if(!Arrays.equals(s.searchRange(new int[]{},4),new int[]{-1,-1}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find First and Last Position of Element in Sorted Array: what invariant or exchange argument makes the solution correct?",
        "back": "Binary-search the first value >=target and the first value >target. If the first boundary contains target, the inclusive answer ends one before the second boundary."
      },
      {
        "type": "Edge case",
        "front": "Find First and Last Position of Element in Sorted Array: what implementation trap should you check before submitting?",
        "back": "Avoid searching for target+1 because target may be Integer.MAX_VALUE. Change the comparison instead."
      },
      {
        "type": "Complexity",
        "front": "Find First and Last Position of Element in Sorted Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-33",
    "number": 33,
    "title": "Search in Rotated Sorted Array",
    "slug": "search-in-rotated-sorted-array",
    "difficulty": "Medium",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "context": "Input: a strictly increasing array rotated at an unknown position, and a target. Return its zero-based index or -1 in logarithmic time. All values are distinct.",
    "examples": "[6,8,1,3,5], target 3 → 3.",
    "solution": "At each midpoint, at least one half is sorted. Check whether target lies within that half using its endpoint bounds; keep that half if so, otherwise keep the other half.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Check nums[mid]==target first and include the correct endpoint equality when deciding which sorted half contains target.",
    "followUp": "What ambiguity appears when duplicate values are allowed?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int search(int[] nums, int target) {\n        int l = 0,\n            r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[l] <= nums[m]) {\n                if (nums[l] <= target && target < nums[m]) r = m - 1;\n                else l = m + 1;\n            } else {\n                if (nums[m] < target && target <= nums[r]) l = m + 1;\n                else r = m - 1;\n            }\n        }\n        return -1;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.search(new int[]{6,8,1,3,5},3)!=3)throw new AssertionError();if(s.search(new int[]{1},0)!=-1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Search in Rotated Sorted Array: what invariant or exchange argument makes the solution correct?",
        "back": "At each midpoint, at least one half is sorted. Check whether target lies within that half using its endpoint bounds; keep that half if so, otherwise keep the other half."
      },
      {
        "type": "Edge case",
        "front": "Search in Rotated Sorted Array: what implementation trap should you check before submitting?",
        "back": "Check nums[mid]==target first and include the correct endpoint equality when deciding which sorted half contains target."
      },
      {
        "type": "Complexity",
        "front": "Search in Rotated Sorted Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-81",
    "number": 81,
    "title": "Search in Rotated Sorted Array II",
    "slug": "search-in-rotated-sorted-array-ii",
    "difficulty": "Medium",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
    "context": "Input: a rotated nondecreasing array that may contain duplicates, and a target. Return whether target occurs.",
    "examples": "[2,2,3,1,2], target 1 → true; target 4 → false.",
    "solution": "Check the midpoint, then identify a sorted half as in rotated search. When both endpoints and midpoint are equal, discard the endpoints: they are not target and reveal no sorted direction. Otherwise select the viable half.",
    "timeComplexity": "O(log n) when comparisons disambiguate; O(n) worst case",
    "spaceComplexity": "O(1)",
    "pitfall": "Duplicates can force linear behavior; do not promise logarithmic worst-case complexity.",
    "followUp": "Construct an input where almost every comparison requires discarding equal endpoints.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean search(int[] nums, int target) {\n        int l = 0,\n            r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return true;\n            if (nums[l] == nums[m] && nums[m] == nums[r]) {\n                l++;\n                r--;\n                continue;\n            }\n            if (nums[l] <= nums[m]) {\n                if (nums[l] <= target && target < nums[m]) r = m - 1;\n                else l = m + 1;\n            } else {\n                if (nums[m] < target && target <= nums[r]) l = m + 1;\n                else r = m - 1;\n            }\n        }\n        return false;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.search(new int[]{2,2,3,1,2},1))throw new AssertionError();if(s.search(new int[]{2,2,3,1,2},4))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Search in Rotated Sorted Array II: what invariant or exchange argument makes the solution correct?",
        "back": "Check the midpoint, then identify a sorted half as in rotated search. When both endpoints and midpoint are equal, discard the endpoints: they are not target and reveal no sorted direction. Otherwise select the viable half."
      },
      {
        "type": "Edge case",
        "front": "Search in Rotated Sorted Array II: what implementation trap should you check before submitting?",
        "back": "Duplicates can force linear behavior; do not promise logarithmic worst-case complexity."
      },
      {
        "type": "Complexity",
        "front": "Search in Rotated Sorted Array II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n) when comparisons disambiguate; O(n) worst case. Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-153",
    "number": 153,
    "title": "Find Minimum in Rotated Sorted Array",
    "slug": "find-minimum-in-rotated-sorted-array",
    "difficulty": "Medium",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "context": "Input: a nonempty rotated strictly increasing array with distinct values. Return its minimum value in logarithmic time; an unrotated array is allowed.",
    "examples": "[7,9,2,4] → 2.",
    "solution": "Compare midpoint with the right endpoint. A larger midpoint lies before the rotation break, so the minimum is strictly to its right. Otherwise midpoint can be the minimum, so retain it as the right boundary.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "When nums[mid]<=nums[right], use right=mid, not mid-1; mid may itself be the minimum.",
    "followUp": "Why is the right endpoint a more convenient reference than the first original value?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findMin(int[] nums) {\n        int l = 0,\n            r = nums.length - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] > nums[r]) l = m + 1;\n            else r = m;\n        }\n        return nums[l];\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findMin(new int[]{7,9,2,4})!=2)throw new AssertionError();if(s.findMin(new int[]{1,2,3})!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find Minimum in Rotated Sorted Array: what invariant or exchange argument makes the solution correct?",
        "back": "Compare midpoint with the right endpoint. A larger midpoint lies before the rotation break, so the minimum is strictly to its right. Otherwise midpoint can be the minimum, so retain it as the right boundary."
      },
      {
        "type": "Edge case",
        "front": "Find Minimum in Rotated Sorted Array: what implementation trap should you check before submitting?",
        "back": "When nums[mid]<=nums[right], use right=mid, not mid-1; mid may itself be the minimum."
      },
      {
        "type": "Complexity",
        "front": "Find Minimum in Rotated Sorted Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-154",
    "number": 154,
    "title": "Find Minimum in Rotated Sorted Array II",
    "slug": "find-minimum-in-rotated-sorted-array-ii",
    "difficulty": "Hard",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/",
    "context": "Input: a nonempty rotated nondecreasing array that may contain duplicates. Return its minimum value.",
    "examples": "[3,3,1,3] → 1.",
    "solution": "Compare midpoint to right. Greater means search right of midpoint; smaller means retain midpoint and search left. Equality allows dropping right because midpoint provides an equal alternative if right was a minimum.",
    "timeComplexity": "O(log n) when distinct enough; O(n) worst case",
    "spaceComplexity": "O(1)",
    "pitfall": "Equality does not identify which half contains the rotation break. Discard only one endpoint safely.",
    "followUp": "Why can all-equal input prevent repeated halving?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findMin(int[] nums) {\n        int l = 0,\n            r = nums.length - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] > nums[r]) l = m + 1;\n            else if (nums[m] < nums[r]) r = m;\n            else r--;\n        }\n        return nums[l];\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findMin(new int[]{3,3,1,3})!=1)throw new AssertionError();if(s.findMin(new int[]{2,2,2})!=2)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find Minimum in Rotated Sorted Array II: what invariant or exchange argument makes the solution correct?",
        "back": "Compare midpoint to right. Greater means search right of midpoint; smaller means retain midpoint and search left. Equality allows dropping right because midpoint provides an equal alternative if right was a minimum."
      },
      {
        "type": "Edge case",
        "front": "Find Minimum in Rotated Sorted Array II: what implementation trap should you check before submitting?",
        "back": "Equality does not identify which half contains the rotation break. Discard only one endpoint safely."
      },
      {
        "type": "Complexity",
        "front": "Find Minimum in Rotated Sorted Array II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n) when distinct enough; O(n) worst case. Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-162",
    "number": 162,
    "title": "Find Peak Element",
    "slug": "find-peak-element",
    "difficulty": "Medium",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/find-peak-element/",
    "context": "Input: a nonempty integer array with unequal adjacent values. Treat outside neighbors as negative infinity. Return any index strictly larger than its adjacent values in logarithmic time.",
    "examples": "[1,4,2] → 1; [1,2,3] → 2.",
    "solution": "Inspect the slope from mid to mid+1. An upward slope guarantees some peak to the right; a downward slope guarantees a peak at mid or to its left. Keep a region that contains at least one peak.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The array need not be globally sorted. The argument relies on slopes and unequal adjacent values, not ordinary target search.",
    "followUp": "How do the imaginary negative-infinity endpoints guarantee that a peak exists?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findPeakElement(int[] nums) {\n        int l = 0,\n            r = nums.length - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] < nums[m + 1]) l = m + 1;\n            else r = m;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findPeakElement(new int[]{1,4,2})!=1)throw new AssertionError();if(s.findPeakElement(new int[]{1,2,3})!=2)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find Peak Element: what invariant or exchange argument makes the solution correct?",
        "back": "Inspect the slope from mid to mid+1. An upward slope guarantees some peak to the right; a downward slope guarantees a peak at mid or to its left. Keep a region that contains at least one peak."
      },
      {
        "type": "Edge case",
        "front": "Find Peak Element: what implementation trap should you check before submitting?",
        "back": "The array need not be globally sorted. The argument relies on slopes and unequal adjacent values, not ordinary target search."
      },
      {
        "type": "Complexity",
        "front": "Find Peak Element: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-852",
    "number": 852,
    "title": "Peak Index in a Mountain Array",
    "slug": "peak-index-in-a-mountain-array",
    "difficulty": "Medium",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
    "context": "Input: an array of length at least three that strictly increases to one interior peak and strictly decreases afterward. Return the peak index in logarithmic time.",
    "examples": "[1,3,8,6,2] → 2.",
    "solution": "Use the adjacent slope as a monotone predicate: before the peak nums[mid]<nums[mid+1]; at or after it, the predicate is false. Binary-search the first downward slope.",
    "timeComplexity": "O(log n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The mountain guarantee excludes plateaus and endpoint peaks; do not assume the method validates an arbitrary array.",
    "followUp": "How is this a special case of searching for the first false in a monotone predicate?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int peakIndexInMountainArray(int[] arr) {\n        int l = 0,\n            r = arr.length - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (arr[m] < arr[m + 1]) l = m + 1;\n            else r = m;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.peakIndexInMountainArray(new int[]{1,3,8,6,2})!=2)throw new AssertionError();if(s.peakIndexInMountainArray(new int[]{0,2,1})!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Peak Index in a Mountain Array: what invariant or exchange argument makes the solution correct?",
        "back": "Use the adjacent slope as a monotone predicate: before the peak nums[mid]<nums[mid+1]; at or after it, the predicate is false. Binary-search the first downward slope."
      },
      {
        "type": "Edge case",
        "front": "Peak Index in a Mountain Array: what implementation trap should you check before submitting?",
        "back": "The mountain guarantee excludes plateaus and endpoint peaks; do not assume the method validates an arbitrary array."
      },
      {
        "type": "Complexity",
        "front": "Peak Index in a Mountain Array: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-74",
    "number": 74,
    "title": "Search a 2D Matrix",
    "slug": "search-a-2d-matrix",
    "difficulty": "Medium",
    "tags": "Matrix, Binary search",
    "url": "https://leetcode.com/problems/search-a-2d-matrix/",
    "context": "Input: a nonempty rectangular matrix whose rows are sorted and whose next row begins after the previous row ends. Return whether target occurs using logarithmic search.",
    "examples": "[[1,4,7],[9,12,15]], target 12 → true.",
    "solution": "The row-order guarantee makes the matrix a sorted virtual one-dimensional array. Map flat index i to row i/columns and column i%columns, then perform ordinary binary search.",
    "timeComplexity": "O(log(rows×cols))",
    "spaceComplexity": "O(1)",
    "pitfall": "This flattening is invalid when rows and columns are sorted but adjacent rows overlap in value range.",
    "followUp": "How does the stronger ordering here differ from Search a 2D Matrix II?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean searchMatrix(int[][] matrix, int target) {\n        int cols = matrix[0].length,\n            l = 0,\n            r = matrix.length * cols - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2,\n                x = matrix[m / cols][m % cols];\n            if (x == target) return true;\n            if (x < target) l = m + 1;\n            else r = m - 1;\n        }\n        return false;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.searchMatrix(new int[][]{{1,4,7},{9,12,15}},12))throw new AssertionError();if(s.searchMatrix(new int[][]{{1,4,7},{9,12,15}},8))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Search a 2D Matrix: what invariant or exchange argument makes the solution correct?",
        "back": "The row-order guarantee makes the matrix a sorted virtual one-dimensional array. Map flat index i to row i/columns and column i%columns, then perform ordinary binary search."
      },
      {
        "type": "Edge case",
        "front": "Search a 2D Matrix: what implementation trap should you check before submitting?",
        "back": "This flattening is invalid when rows and columns are sorted but adjacent rows overlap in value range."
      },
      {
        "type": "Complexity",
        "front": "Search a 2D Matrix: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log(rows×cols)). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-240",
    "number": 240,
    "title": "Search a 2D Matrix II",
    "slug": "search-a-2d-matrix-ii",
    "difficulty": "Medium",
    "tags": "Matrix, Ordered search",
    "url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    "context": "Input: a nonempty rectangular matrix sorted left-to-right in each row and top-to-bottom in each column. Return whether target occurs; row value ranges may overlap.",
    "examples": "[[1,4],[2,5]], target 2 → true.",
    "solution": "Start at top-right. If the value is too large, eliminate its column; if too small, eliminate its row. Sorted rows and columns justify each elimination, leaving a smaller candidate rectangle.",
    "timeComplexity": "O(rows+cols)",
    "spaceComplexity": "O(1)",
    "pitfall": "Flattening this matrix does not necessarily produce a sorted list. Use a corner that permits two different elimination directions.",
    "followUp": "Why do top-left and bottom-right not offer the same one-comparison choice?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean searchMatrix(int[][] matrix, int target) {\n        int r = 0,\n            c = matrix[0].length - 1;\n        while (r < matrix.length && c >= 0) {\n            int x = matrix[r][c];\n            if (x == target) return true;\n            if (x > target) c--;\n            else r++;\n        }\n        return false;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.searchMatrix(new int[][]{{1,4},{2,5}},2))throw new AssertionError();if(s.searchMatrix(new int[][]{{1,4},{2,5}},3))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Search a 2D Matrix II: what invariant or exchange argument makes the solution correct?",
        "back": "Start at top-right. If the value is too large, eliminate its column; if too small, eliminate its row. Sorted rows and columns justify each elimination, leaving a smaller candidate rectangle."
      },
      {
        "type": "Edge case",
        "front": "Search a 2D Matrix II: what implementation trap should you check before submitting?",
        "back": "Flattening this matrix does not necessarily produce a sorted list. Use a corner that permits two different elimination directions."
      },
      {
        "type": "Complexity",
        "front": "Search a 2D Matrix II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(rows+cols). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-875",
    "number": 875,
    "title": "Koko Eating Bananas",
    "slug": "koko-eating-bananas",
    "difficulty": "Medium",
    "tags": "Array, Binary search on answer",
    "url": "https://leetcode.com/problems/koko-eating-bananas/",
    "context": "Input: positive pile sizes and h hours, with h at least the number of piles. At a chosen integer speed, each hour processes at most one pile. Return the smallest speed that finishes all piles within h hours.",
    "examples": "piles=[4,8], h=4 → speed 4: one hour plus two hours; speed 3 needs five.",
    "solution": "At speed k, required hours are the sum of ceil(pile/k). This decreases as speed increases, creating an infeasible-then-feasible predicate. Binary-search the first feasible speed between 1 and the largest pile.",
    "timeComplexity": "O(n log(max pile))",
    "spaceComplexity": "O(1)",
    "pitfall": "Use long when summing hours and compute ceiling division with a long intermediate to avoid overflow.",
    "followUp": "Why is max(piles) always a feasible upper bound under the h>=n assumption?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minEatingSpeed(int[] piles, int h) {\n        int l = 1,\n            r = 0;\n        for (int p : piles) r = Math.max(r, p);\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            long hours = 0;\n            for (int p : piles) hours += (p + (long) m - 1) / m;\n            if (hours <= h) r = m;\n            else l = m + 1;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.minEatingSpeed(new int[]{4,8},4)!=4)throw new AssertionError();if(s.minEatingSpeed(new int[]{1000000000,1000000000},2)!=1000000000)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Koko Eating Bananas: what invariant or exchange argument makes the solution correct?",
        "back": "At speed k, required hours are the sum of ceil(pile/k). This decreases as speed increases, creating an infeasible-then-feasible predicate. Binary-search the first feasible speed between 1 and the largest pile."
      },
      {
        "type": "Edge case",
        "front": "Koko Eating Bananas: what implementation trap should you check before submitting?",
        "back": "Use long when summing hours and compute ceiling division with a long intermediate to avoid overflow."
      },
      {
        "type": "Complexity",
        "front": "Koko Eating Bananas: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log(max pile)). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-1011",
    "number": 1011,
    "title": "Capacity To Ship Packages Within D Days",
    "slug": "capacity-to-ship-packages-within-d-days",
    "difficulty": "Medium",
    "tags": "Array, Binary search on answer",
    "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "context": "Input: positive package weights in fixed order and a positive day limit. Return the minimum daily capacity allowing shipment in order within that limit. Packages cannot be split; input bounds make total weight fit int.",
    "examples": "[2,3,4], days=2 → capacity 5, shipping [2,3] then [4].",
    "solution": "For a candidate capacity, greedily fill each day until the next package would exceed it. This uses the fewest days at that capacity. Feasibility is monotone, so binary-search from the largest weight to the total weight.",
    "timeComplexity": "O(n log(sum weights))",
    "spaceComplexity": "O(1)",
    "pitfall": "Preserve package order. Sorting weights changes the problem.",
    "followUp": "Why does filling each day greedily minimize the number of days for a fixed capacity?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int shipWithinDays(int[] weights, int days) {\n        int l = 0,\n            r = 0;\n        for (int w : weights) {\n            l = Math.max(l, w);\n            r += w;\n        }\n        while (l < r) {\n            int m = l + (r - l) / 2,\n                used = 1,\n                load = 0;\n            for (int w : weights) {\n                if (load + w > m) {\n                    used++;\n                    load = 0;\n                }\n                load += w;\n            }\n            if (used <= days) r = m;\n            else l = m + 1;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.shipWithinDays(new int[]{2,3,4},2)!=5)throw new AssertionError();if(s.shipWithinDays(new int[]{2,3,4},1)!=9)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Capacity To Ship Packages Within D Days: what invariant or exchange argument makes the solution correct?",
        "back": "For a candidate capacity, greedily fill each day until the next package would exceed it. This uses the fewest days at that capacity. Feasibility is monotone, so binary-search from the largest weight to the total weight."
      },
      {
        "type": "Edge case",
        "front": "Capacity To Ship Packages Within D Days: what implementation trap should you check before submitting?",
        "back": "Preserve package order. Sorting weights changes the problem."
      },
      {
        "type": "Complexity",
        "front": "Capacity To Ship Packages Within D Days: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log(sum weights)). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-1482",
    "number": 1482,
    "title": "Minimum Number of Days to Make m Bouquets",
    "slug": "minimum-number-of-days-to-make-m-bouquets",
    "difficulty": "Medium",
    "tags": "Array, Binary search on answer",
    "url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    "context": "Input: bloom days along a row, required bouquet count m, and k adjacent flowers per bouquet. A flower can be used once. Return the earliest day to form m bouquets, or -1 if impossible.",
    "examples": "bloom=[1,3,2,4], m=2, k=2 → day 4.",
    "solution": "For a candidate day, scan consecutive bloomed runs and consume each block of k into a bouquet. Unbloomed positions reset the run. The bouquet count never decreases with day, so find the first feasible day by binary search.",
    "timeComplexity": "O(n log(max bloom day))",
    "spaceComplexity": "O(1)",
    "pitfall": "Check (long)m*k>n before searching. Adjacency matters; merely counting bloomed flowers is insufficient.",
    "followUp": "Why does greedily consuming the first k flowers of each available run lose no bouquets?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minDays(int[] bloomDay, int m, int k) {\n        if ((long) m * k > bloomDay.length) return -1;\n        int l = 1,\n            r = 0;\n        for (int d : bloomDay) r = Math.max(r, d);\n        while (l < r) {\n            int mid = l + (r - l) / 2,\n                run = 0,\n                made = 0;\n            for (int d : bloomDay) {\n                if (d <= mid) {\n                    if (++run == k) {\n                        made++;\n                        run = 0;\n                    }\n                } else run = 0;\n            }\n            if (made >= m) r = mid;\n            else l = mid + 1;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.minDays(new int[]{1,3,2,4},2,2)!=4)throw new AssertionError();if(s.minDays(new int[]{1,2},2,2)!=-1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Number of Days to Make m Bouquets: what invariant or exchange argument makes the solution correct?",
        "back": "For a candidate day, scan consecutive bloomed runs and consume each block of k into a bouquet. Unbloomed positions reset the run. The bouquet count never decreases with day, so find the first feasible day by binary search."
      },
      {
        "type": "Edge case",
        "front": "Minimum Number of Days to Make m Bouquets: what implementation trap should you check before submitting?",
        "back": "Check (long)m*k>n before searching. Adjacency matters; merely counting bloomed flowers is insufficient."
      },
      {
        "type": "Complexity",
        "front": "Minimum Number of Days to Make m Bouquets: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log(max bloom day)). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-1552",
    "number": 1552,
    "title": "Magnetic Force Between Two Balls",
    "slug": "magnetic-force-between-two-balls",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Binary search on answer",
    "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
    "context": "Input: distinct basket positions and a number m from 2 through the number of baskets. Place m balls to maximize the minimum pairwise distance, and return that distance.",
    "examples": "positions=[1,4,8,10], m=3 → 3 using 1,4,8. No placement achieves a minimum gap of 4.",
    "solution": "Sort positions. For a candidate gap, greedily place the first ball at the first basket and each next ball at the earliest basket far enough away. This leaves maximal room for later balls. Search for the largest feasible gap.",
    "timeComplexity": "O(n log n + n log(position range))",
    "spaceComplexity": "O(log n) sorting stack",
    "pitfall": "Use an upper midpoint when left is updated to mid; otherwise a two-value search interval may not shrink.",
    "followUp": "Why is earliest feasible placement optimal for testing a fixed minimum gap?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxDistance(int[] position, int m) {\n        Arrays.sort(position);\n        int l = 0,\n            r = position[position.length - 1] - position[0];\n        while (l < r) {\n            int gap = l + (r - l + 1) / 2,\n                count = 1,\n                last = position[0];\n            for (int i = 1; i < position.length; i++) if (\n                position[i] - last >= gap\n            ) {\n                count++;\n                last = position[i];\n            }\n            if (count >= m) l = gap;\n            else r = gap - 1;\n        }\n        return l;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.maxDistance(new int[]{1,4,8,10},3)!=3)throw new AssertionError();if(s.maxDistance(new int[]{1,10},2)!=9)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Magnetic Force Between Two Balls: what invariant or exchange argument makes the solution correct?",
        "back": "Sort positions. For a candidate gap, greedily place the first ball at the first basket and each next ball at the earliest basket far enough away. This leaves maximal room for later balls. Search for the largest feasible gap."
      },
      {
        "type": "Edge case",
        "front": "Magnetic Force Between Two Balls: what implementation trap should you check before submitting?",
        "back": "Use an upper midpoint when left is updated to mid; otherwise a two-value search interval may not shrink."
      },
      {
        "type": "Complexity",
        "front": "Magnetic Force Between Two Balls: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log n + n log(position range)). Extra space: O(log n) sorting stack."
      }
    ]
  },
  {
    "id": "lc-4",
    "number": 4,
    "title": "Median of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "difficulty": "Hard",
    "tags": "Array, Binary search",
    "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "context": "Input: two nondecreasing integer arrays, at least one nonempty. Return the median of their combined values without merging, in logarithmic time. Values are within ±10^6.",
    "examples": "[1,5] and [2,3] → 2.5; [] and [4] → 4.0.",
    "solution": "Binary-search the partition in the shorter array, deriving the other partition so the left side holds half the elements, rounded up. A valid partition has both left maxima <= the opposite right minima. Then the middle value or middle pair gives the median.",
    "timeComplexity": "O(log(min(m,n)+1))",
    "spaceComplexity": "O(1)",
    "pitfall": "Use sentinels for empty partition sides. For an even total, average with floating-point division rather than integer division.",
    "followUp": "Why does searching the shorter array keep the derived partition within the other array?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public double findMedianSortedArrays(int[] a, int[] b) {\n        if (a.length > b.length) return findMedianSortedArrays(b, a);\n        int m = a.length,\n            n = b.length,\n            l = 0,\n            r = m;\n        while (l <= r) {\n            int i = l + (r - l) / 2,\n                j = (m + n + 1) / 2 - i;\n            int al = i == 0 ? Integer.MIN_VALUE : a[i - 1],\n                ar = i == m ? Integer.MAX_VALUE : a[i],\n                bl = j == 0 ? Integer.MIN_VALUE : b[j - 1],\n                br = j == n ? Integer.MAX_VALUE : b[j];\n            if (al <= br && bl <= ar) {\n                if ((m + n) % 2 == 1) return Math.max(al, bl);\n                return ((long) Math.max(al, bl) + Math.min(ar, br)) / 2.0;\n            }\n            if (al > br) r = i - 1;\n            else l = i + 1;\n        }\n        throw new IllegalArgumentException();\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findMedianSortedArrays(new int[]{1,5},new int[]{2,3})!=2.5)throw new AssertionError();if(s.findMedianSortedArrays(new int[]{},new int[]{4})!=4.0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Median of Two Sorted Arrays: what invariant or exchange argument makes the solution correct?",
        "back": "Binary-search the partition in the shorter array, deriving the other partition so the left side holds half the elements, rounded up. A valid partition has both left maxima <= the opposite right minima. Then the middle value or middle pair gives the median."
      },
      {
        "type": "Edge case",
        "front": "Median of Two Sorted Arrays: what implementation trap should you check before submitting?",
        "back": "Use sentinels for empty partition sides. For an even total, average with floating-point division rather than integer division."
      },
      {
        "type": "Complexity",
        "front": "Median of Two Sorted Arrays: state the time and extra-space costs of this implementation.",
        "back": "Time: O(log(min(m,n)+1)). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-56",
    "number": 56,
    "title": "Merge Intervals",
    "slug": "merge-intervals",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Intervals",
    "url": "https://leetcode.com/problems/merge-intervals/",
    "context": "Input: closed integer intervals [start,end] in arbitrary order with start<=end. Return their union as nonoverlapping intervals. Touching endpoints overlap.",
    "examples": "[[1,3],[3,6],[9,10]] → [[1,6],[9,10]].",
    "solution": "Sort by start. Maintain the last merged interval: extend its end when the next start is within it, otherwise append a new interval. Sorted starts guarantee no future interval can bridge a completed gap.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n) output and sorting workspace",
    "pitfall": "For closed intervals, start==previousEnd merges. Extend with max(end), because a nested interval must not shorten the union.",
    "followUp": "How would endpoint rules change for half-open intervals?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[][] merge(int[][] intervals) {\n        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));\n        List<int[]> out = new ArrayList<>();\n        for (int[] x : intervals) {\n            if (out.isEmpty() || x[0] > out.get(out.size() - 1)[1]) out.add(\n                x.clone()\n            );\n            else out.get(out.size() - 1)[1] = Math.max(\n                out.get(out.size() - 1)[1],\n                x[1]\n            );\n        }\n        return out.toArray(new int[0][]);\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!Arrays.deepEquals(s.merge(new int[][]{{1,3},{3,6},{9,10}}),new int[][]{{1,6},{9,10}}))throw new AssertionError();if(!Arrays.deepEquals(s.merge(new int[][]{{1,9},{2,3}}),new int[][]{{1,9}}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Merge Intervals: what invariant or exchange argument makes the solution correct?",
        "back": "Sort by start. Maintain the last merged interval: extend its end when the next start is within it, otherwise append a new interval. Sorted starts guarantee no future interval can bridge a completed gap."
      },
      {
        "type": "Edge case",
        "front": "Merge Intervals: what implementation trap should you check before submitting?",
        "back": "For closed intervals, start==previousEnd merges. Extend with max(end), because a nested interval must not shorten the union."
      },
      {
        "type": "Complexity",
        "front": "Merge Intervals: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log n). Extra space: O(n) output and sorting workspace."
      }
    ]
  },
  {
    "id": "lc-57",
    "number": 57,
    "title": "Insert Interval",
    "slug": "insert-interval",
    "difficulty": "Medium",
    "tags": "Array, Intervals",
    "url": "https://leetcode.com/problems/insert-interval/",
    "context": "Input: sorted nonoverlapping closed intervals and one additional interval. Return a sorted nonoverlapping union after inserting it. The original list may be empty.",
    "examples": "[[1,2],[6,8]], new [2,7] → [[1,8]].",
    "solution": "Copy intervals strictly before the new one. Merge every interval whose start reaches the growing merged end. Append that merged interval, then copy the remaining intervals. Existing sorted disjoint order makes three linear phases sufficient.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n) output",
    "pitfall": "The merged end may expand during scanning, allowing overlap with intervals that did not overlap the original new interval.",
    "followUp": "Why is sorting unnecessary given the input invariant?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        List<int[]> out = new ArrayList<>();\n        int i = 0,\n            start = newInterval[0],\n            end = newInterval[1];\n        while (i < intervals.length && intervals[i][1] < start)\n            out.add(intervals[i++].clone());\n        while (i < intervals.length && intervals[i][0] <= end) {\n            start = Math.min(start, intervals[i][0]);\n            end = Math.max(end, intervals[i++][1]);\n        }\n        out.add(new int[] { start, end });\n        while (i < intervals.length) out.add(intervals[i++].clone());\n        return out.toArray(new int[0][]);\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!Arrays.deepEquals(s.insert(new int[][]{{1,2},{6,8}},new int[]{2,7}),new int[][]{{1,8}}))throw new AssertionError();if(!Arrays.deepEquals(s.insert(new int[][]{},new int[]{2,3}),new int[][]{{2,3}}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Insert Interval: what invariant or exchange argument makes the solution correct?",
        "back": "Copy intervals strictly before the new one. Merge every interval whose start reaches the growing merged end. Append that merged interval, then copy the remaining intervals. Existing sorted disjoint order makes three linear phases sufficient."
      },
      {
        "type": "Edge case",
        "front": "Insert Interval: what implementation trap should you check before submitting?",
        "back": "The merged end may expand during scanning, allowing overlap with intervals that did not overlap the original new interval."
      },
      {
        "type": "Complexity",
        "front": "Insert Interval: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(n) output."
      }
    ]
  },
  {
    "id": "lc-435",
    "number": 435,
    "title": "Non-overlapping Intervals",
    "slug": "non-overlapping-intervals",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Greedy, Intervals",
    "url": "https://leetcode.com/problems/non-overlapping-intervals/",
    "context": "Input: intervals with start<end. Remove the fewest intervals so the rest do not overlap; touching endpoints are allowed. Return the removal count.",
    "examples": "[[1,3],[2,4],[3,5]] → 1, retaining [1,3] and [3,5].",
    "solution": "Sort by finishing time and greedily retain the next interval starting at or after the last retained end. An earlier finish leaves at least as much room as any alternative, so this maximizes retained count. Subtract from n.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n) Java object-array sorting workspace",
    "pitfall": "This problem allows touching intervals, unlike merging closed unions where touching intervals combine.",
    "followUp": "State the exchange argument for replacing an optimal first interval by the earliest-finishing one.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int eraseOverlapIntervals(int[][] intervals) {\n        Arrays.sort(intervals, Comparator.comparingInt(a -> a[1]));\n        int kept = 0,\n            end = Integer.MIN_VALUE;\n        for (int[] x : intervals)\n            if (x[0] >= end) {\n                kept++;\n                end = x[1];\n            }\n        return intervals.length - kept;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.eraseOverlapIntervals(new int[][]{{1,3},{2,4},{3,5}})!=1)throw new AssertionError();if(s.eraseOverlapIntervals(new int[][]{{1,2},{2,3}})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Non-overlapping Intervals: what invariant or exchange argument makes the solution correct?",
        "back": "Sort by finishing time and greedily retain the next interval starting at or after the last retained end. An earlier finish leaves at least as much room as any alternative, so this maximizes retained count. Subtract from n."
      },
      {
        "type": "Edge case",
        "front": "Non-overlapping Intervals: what implementation trap should you check before submitting?",
        "back": "This problem allows touching intervals, unlike merging closed unions where touching intervals combine."
      },
      {
        "type": "Complexity",
        "front": "Non-overlapping Intervals: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log n). Extra space: O(n) Java object-array sorting workspace."
      }
    ]
  },
  {
    "id": "lc-452",
    "number": 452,
    "title": "Minimum Number of Arrows to Burst Balloons",
    "slug": "minimum-number-of-arrows-to-burst-balloons",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Greedy, Intervals",
    "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    "context": "Input: closed horizontal balloon intervals. A vertical arrow at x bursts every interval containing x. Return the minimum arrows needed; endpoints may span the full signed-int range.",
    "examples": "[[1,4],[2,5],[6,8]] → 2, with arrows at 4 and 8.",
    "solution": "Sort by right endpoint and place an arrow at the earliest ending uncovered interval end. Every interval containing that point is covered. Moving an optimal first arrow to this end cannot lose coverage among remaining intervals that began before it.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n) Java object-array sorting workspace",
    "pitfall": "Use Integer.compare or comparingInt, not subtraction, when sorting endpoints to avoid overflow. Touching balloons can share an arrow.",
    "followUp": "How does the greedy choice resemble interval scheduling, and how does its equality condition differ?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findMinArrowShots(int[][] points) {\n        if (points.length == 0) return 0;\n        Arrays.sort(points, Comparator.comparingInt(a -> a[1]));\n        int arrows = 1,\n            end = points[0][1];\n        for (int[] p : points)\n            if (p[0] > end) {\n                arrows++;\n                end = p[1];\n            }\n        return arrows;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.findMinArrowShots(new int[][]{{1,4},{2,5},{6,8}})!=2)throw new AssertionError();if(s.findMinArrowShots(new int[][]{{-2147483648,-1},{-1,2147483647}})!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Number of Arrows to Burst Balloons: what invariant or exchange argument makes the solution correct?",
        "back": "Sort by right endpoint and place an arrow at the earliest ending uncovered interval end. Every interval containing that point is covered. Moving an optimal first arrow to this end cannot lose coverage among remaining intervals that began before it."
      },
      {
        "type": "Edge case",
        "front": "Minimum Number of Arrows to Burst Balloons: what implementation trap should you check before submitting?",
        "back": "Use Integer.compare or comparingInt, not subtraction, when sorting endpoints to avoid overflow. Touching balloons can share an arrow."
      },
      {
        "type": "Complexity",
        "front": "Minimum Number of Arrows to Burst Balloons: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log n). Extra space: O(n) Java object-array sorting workspace."
      }
    ]
  },
  {
    "id": "lc-986",
    "number": 986,
    "title": "Interval List Intersections",
    "slug": "interval-list-intersections",
    "difficulty": "Medium",
    "tags": "Array, Two pointers, Intervals",
    "url": "https://leetcode.com/problems/interval-list-intersections/",
    "context": "Input: two lists of closed intervals, each sorted and pairwise disjoint. Return their intersections in order; either list may be empty. A shared endpoint is a one-point intersection.",
    "examples": "[[1,4],[7,9]] and [[3,8]] → [[3,4],[7,8]].",
    "solution": "For the current pair, intersect using max(starts) and min(ends). Emit if start<=end. Advance the interval with the smaller end because it cannot intersect any later interval beyond that endpoint.",
    "timeComplexity": "O(m+n)",
    "spaceComplexity": "O(1) excluding output",
    "pitfall": "Use <= when testing an intersection so touching endpoints are retained.",
    "followUp": "Why is advancing both pointers safe when the current ends are equal?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n        List<int[]> out = new ArrayList<>();\n        int i = 0,\n            j = 0;\n        while (i < firstList.length && j < secondList.length) {\n            int lo = Math.max(firstList[i][0], secondList[j][0]),\n                hi = Math.min(firstList[i][1], secondList[j][1]);\n            if (lo <= hi) out.add(new int[] { lo, hi });\n            if (firstList[i][1] < secondList[j][1]) i++;\n            else j++;\n        }\n        return out.toArray(new int[0][]);\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!Arrays.deepEquals(s.intervalIntersection(new int[][]{{1,4},{7,9}},new int[][]{{3,8}}),new int[][]{{3,4},{7,8}}))throw new AssertionError();if(!Arrays.deepEquals(s.intervalIntersection(new int[][]{{1,2}},new int[][]{{2,3}}),new int[][]{{2,2}}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Interval List Intersections: what invariant or exchange argument makes the solution correct?",
        "back": "For the current pair, intersect using max(starts) and min(ends). Emit if start<=end. Advance the interval with the smaller end because it cannot intersect any later interval beyond that endpoint."
      },
      {
        "type": "Edge case",
        "front": "Interval List Intersections: what implementation trap should you check before submitting?",
        "back": "Use <= when testing an intersection so touching endpoints are retained."
      },
      {
        "type": "Complexity",
        "front": "Interval List Intersections: state the time and extra-space costs of this implementation.",
        "back": "Time: O(m+n). Extra space: O(1) excluding output."
      }
    ]
  },
  {
    "id": "lc-228",
    "number": 228,
    "title": "Summary Ranges",
    "slug": "summary-ranges",
    "difficulty": "Easy",
    "tags": "Array, Intervals",
    "url": "https://leetcode.com/problems/summary-ranges/",
    "context": "Input: a sorted array of distinct signed integers, possibly empty. Return the smallest ordered list of strings representing consecutive runs, using a singleton value or start->end.",
    "examples": "[1,2,3,7,9,10] → [\"1->3\",\"7\",\"9->10\"].",
    "solution": "Start a run at each unprocessed value and extend while the next value is exactly one larger. Emit the run and continue. Each maximal consecutive run becomes exactly one range.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) auxiliary, excluding output strings",
    "pitfall": "Use long for the adjacency comparison to avoid overflow at Integer.MAX_VALUE.",
    "followUp": "Why does the distinct-and-sorted assumption eliminate the need for sorting or deduplication?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<String> summaryRanges(int[] nums) {\n        List<String> out = new ArrayList<>();\n        int i = 0;\n        while (i < nums.length) {\n            int start = i;\n            while (\n                    i + 1 < nums.length &&\n                    (long) nums[i + 1] == (long) nums[i] + 1\n                )\n                i++;\n            out.add(\n                start == i\n                    ? Integer.toString(nums[i])\n                    : nums[start] + \"->\" + nums[i]\n            );\n            i++;\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.summaryRanges(new int[]{1,2,3,7,9,10}).equals(Arrays.asList(\"1->3\",\"7\",\"9->10\")))throw new AssertionError();if(!s.summaryRanges(new int[]{Integer.MIN_VALUE,Integer.MAX_VALUE}).equals(Arrays.asList(\"-2147483648\",\"2147483647\")))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Summary Ranges: what invariant or exchange argument makes the solution correct?",
        "back": "Start a run at each unprocessed value and extend while the next value is exactly one larger. Emit the run and continue. Each maximal consecutive run becomes exactly one range."
      },
      {
        "type": "Edge case",
        "front": "Summary Ranges: what implementation trap should you check before submitting?",
        "back": "Use long for the adjacency comparison to avoid overflow at Integer.MAX_VALUE."
      },
      {
        "type": "Complexity",
        "front": "Summary Ranges: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1) auxiliary, excluding output strings."
      }
    ]
  },
  {
    "id": "lc-121",
    "number": 121,
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "difficulty": "Easy",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "context": "Input: nonnegative daily prices. Buy at most once and sell on a later day. Return the greatest profit, or zero when no profitable trade exists.",
    "examples": "[8,3,6,2,7] → 5 by buying at 2 and selling at 7.",
    "solution": "Track the lowest price seen so far and the best profit from selling today. Every legal transaction has a sell day; pairing it with the cheapest earlier buy day is optimal for that sell day.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "A high price before the minimum is not a legal later sale. Preserve chronological order.",
    "followUp": "How would you return buy and sell indices as well as profit?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProfit(int[] prices) {\n        int low = Integer.MAX_VALUE,\n            best = 0;\n        for (int p : prices) {\n            low = Math.min(low, p);\n            best = Math.max(best, p - low);\n        }\n        return best;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.maxProfit(new int[]{8,3,6,2,7})!=5)throw new AssertionError();if(s.maxProfit(new int[]{5,4,2})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Best Time to Buy and Sell Stock: what invariant or exchange argument makes the solution correct?",
        "back": "Track the lowest price seen so far and the best profit from selling today. Every legal transaction has a sell day; pairing it with the cheapest earlier buy day is optimal for that sell day."
      },
      {
        "type": "Edge case",
        "front": "Best Time to Buy and Sell Stock: what implementation trap should you check before submitting?",
        "back": "A high price before the minimum is not a legal later sale. Preserve chronological order."
      },
      {
        "type": "Complexity",
        "front": "Best Time to Buy and Sell Stock: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-122",
    "number": 122,
    "title": "Best Time to Buy and Sell Stock II",
    "slug": "best-time-to-buy-and-sell-stock-ii",
    "difficulty": "Medium",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    "context": "Input: nonnegative daily prices. Perform any number of buy/sell transactions, holding at most one share at a time, with no fee or cooldown. Return maximum profit.",
    "examples": "[2,5,1,4] → 6 by collecting gains 3 and 3.",
    "solution": "Sum every positive adjacent price difference. A rising run telescopes to its buy-low/sell-high profit, while declining steps should be skipped. Without fees or cooldowns, splitting a rising run changes no total gain.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "This reasoning fails once transaction fees, cooldowns, or a transaction-count limit are introduced.",
    "followUp": "Which state variables become necessary when a per-transaction fee is added?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProfit(int[] prices) {\n        int profit = 0;\n        for (int i = 1; i < prices.length; i++) profit += Math.max(\n            0,\n            prices[i] - prices[i - 1]\n        );\n        return profit;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.maxProfit(new int[]{2,5,1,4})!=6)throw new AssertionError();if(s.maxProfit(new int[]{4,3,2})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Best Time to Buy and Sell Stock II: what invariant or exchange argument makes the solution correct?",
        "back": "Sum every positive adjacent price difference. A rising run telescopes to its buy-low/sell-high profit, while declining steps should be skipped. Without fees or cooldowns, splitting a rising run changes no total gain."
      },
      {
        "type": "Edge case",
        "front": "Best Time to Buy and Sell Stock II: what implementation trap should you check before submitting?",
        "back": "This reasoning fails once transaction fees, cooldowns, or a transaction-count limit are introduced."
      },
      {
        "type": "Complexity",
        "front": "Best Time to Buy and Sell Stock II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-55",
    "number": 55,
    "title": "Jump Game",
    "slug": "jump-game",
    "difficulty": "Medium",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/jump-game/",
    "context": "Input: a nonempty array of nonnegative jump limits. Starting at index zero, each move advances by at most the value at the current index. Return whether the final index is reachable.",
    "examples": "[2,0,1,0] → true; [1,0,2] → false.",
    "solution": "Maintain the farthest index reachable from processed positions. If the current index lies beyond it, no earlier reachable position can bridge the gap. Otherwise extend reach using currentIndex+jumpLimit.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "A zero is not automatically fatal; earlier jumps may skip over it. Only a gap beyond the reachable frontier proves failure.",
    "followUp": "How would you reconstruct an actual valid path rather than only reachability?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean canJump(int[] nums) {\n        int reach = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (i > reach) return false;\n            reach = Math.max(reach, i + nums[i]);\n            if (reach >= nums.length - 1) return true;\n        }\n        return true;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.canJump(new int[]{2,0,1,0}))throw new AssertionError();if(s.canJump(new int[]{1,0,2}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Jump Game: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain the farthest index reachable from processed positions. If the current index lies beyond it, no earlier reachable position can bridge the gap. Otherwise extend reach using currentIndex+jumpLimit."
      },
      {
        "type": "Edge case",
        "front": "Jump Game: what implementation trap should you check before submitting?",
        "back": "A zero is not automatically fatal; earlier jumps may skip over it. Only a gap beyond the reachable frontier proves failure."
      },
      {
        "type": "Complexity",
        "front": "Jump Game: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-45",
    "number": 45,
    "title": "Jump Game II",
    "slug": "jump-game-ii",
    "difficulty": "Medium",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/jump-game-ii/",
    "context": "Input: nonnegative jump limits with a guaranteed path from index zero to the final index. Return the minimum number of jumps. A length-one input needs zero jumps.",
    "examples": "[2,1,2,1,1] → 2 by jumping 0→2→4.",
    "solution": "Treat the current reachable range as one jump layer. Scan it while computing the farthest next reach. When the scan hits the current layer end, commit one jump and replace the layer end with the next reach. This is breadth-first layering without an explicit queue.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Do not process the final index as a new jump boundary; reaching it already completes the trip.",
    "followUp": "How would you detect impossible inputs if the reachability guarantee were removed?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int jump(int[] nums) {\n        int end = 0,\n            far = 0,\n            jumps = 0;\n        for (int i = 0; i < nums.length - 1; i++) {\n            far = Math.max(far, i + nums[i]);\n            if (i == end) {\n                jumps++;\n                end = far;\n            }\n        }\n        return jumps;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.jump(new int[]{2,1,2,1,1})!=2)throw new AssertionError();if(s.jump(new int[]{0})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Jump Game II: what invariant or exchange argument makes the solution correct?",
        "back": "Treat the current reachable range as one jump layer. Scan it while computing the farthest next reach. When the scan hits the current layer end, commit one jump and replace the layer end with the next reach. This is breadth-first layering without an explicit queue."
      },
      {
        "type": "Edge case",
        "front": "Jump Game II: what implementation trap should you check before submitting?",
        "back": "Do not process the final index as a new jump boundary; reaching it already completes the trip."
      },
      {
        "type": "Complexity",
        "front": "Jump Game II: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-134",
    "number": 134,
    "title": "Gas Station",
    "slug": "gas-station",
    "difficulty": "Medium",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/gas-station/",
    "context": "Input: equal-length nonnegative gas and travel-cost arrays describing a circular route. Start with an empty tank at any station and collect its gas before traveling. Return a feasible starting index, or -1. A feasible start is unique when it exists.",
    "examples": "gas=[2,4,1], cost=[3,1,3] → 1: balances around the route are 3,1,0.",
    "solution": "Track total net fuel and the running balance since a candidate start. When that balance becomes negative, every start within the failed segment is impossible, so restart after it. A nonnegative total guarantees the surviving candidate completes the cycle.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "A locally nonnegative final segment is insufficient; the total fuel across the complete circle must also cover total cost.",
    "followUp": "Prove why every station inside a failed candidate segment can be skipped.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        int total = 0,\n            tank = 0,\n            start = 0;\n        for (int i = 0; i < gas.length; i++) {\n            int d = gas[i] - cost[i];\n            total += d;\n            tank += d;\n            if (tank < 0) {\n                start = i + 1;\n                tank = 0;\n            }\n        }\n        return total < 0 ? -1 : start;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.canCompleteCircuit(new int[]{2,4,1},new int[]{3,1,3})!=1)throw new AssertionError();if(s.canCompleteCircuit(new int[]{1,1},new int[]{2,2})!=-1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Gas Station: what invariant or exchange argument makes the solution correct?",
        "back": "Track total net fuel and the running balance since a candidate start. When that balance becomes negative, every start within the failed segment is impossible, so restart after it. A nonnegative total guarantees the surviving candidate completes the cycle."
      },
      {
        "type": "Edge case",
        "front": "Gas Station: what implementation trap should you check before submitting?",
        "back": "A locally nonnegative final segment is insufficient; the total fuel across the complete circle must also cover total cost."
      },
      {
        "type": "Complexity",
        "front": "Gas Station: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  },
  {
    "id": "lc-135",
    "number": 135,
    "title": "Candy",
    "slug": "candy",
    "difficulty": "Hard",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/candy/",
    "context": "Input: ratings of children in a line. Give every child at least one candy; a child with a strictly higher rating than an immediate neighbor must receive more candy than that neighbor. Return the minimum total.",
    "examples": "[1,3,2] → 4 via [1,2,1]; equal neighbors impose no inequality.",
    "solution": "A left-to-right pass assigns the minimum satisfying left-neighbor constraints. A right-to-left pass raises values as needed for right-neighbor constraints, taking the maximum with existing assignments. The pointwise maxima meet both lower bounds minimally.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "During the backward pass use max(existing,right+1). Overwriting can destroy a left-neighbor constraint.",
    "followUp": "Can slopes of increasing and decreasing runs yield a constant-space variant?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int candy(int[] ratings) {\n        int n = ratings.length;\n        int[] c = new int[n];\n        Arrays.fill(c, 1);\n        for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] =\n            c[i - 1] + 1;\n        for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] =\n            Math.max(c[i], c[i + 1] + 1);\n        int total = 0;\n        for (int x : c) total += x;\n        return total;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.candy(new int[]{1,3,2})!=4)throw new AssertionError();if(s.candy(new int[]{2,2,2})!=3)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Candy: what invariant or exchange argument makes the solution correct?",
        "back": "A left-to-right pass assigns the minimum satisfying left-neighbor constraints. A right-to-left pass raises values as needed for right-neighbor constraints, taking the maximum with existing assignments. The pointwise maxima meet both lower bounds minimally."
      },
      {
        "type": "Edge case",
        "front": "Candy: what implementation trap should you check before submitting?",
        "back": "During the backward pass use max(existing,right+1). Overwriting can destroy a left-neighbor constraint."
      },
      {
        "type": "Complexity",
        "front": "Candy: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-455",
    "number": 455,
    "title": "Assign Cookies",
    "slug": "assign-cookies",
    "difficulty": "Easy",
    "tags": "Array, Sorting, Greedy",
    "url": "https://leetcode.com/problems/assign-cookies/",
    "context": "Input: children with positive minimum acceptable cookie sizes and available cookie sizes. Each child receives at most one cookie and each cookie is used once. Return the maximum number satisfied.",
    "examples": "needs=[2,3], cookies=[1,2,4] → 2.",
    "solution": "Sort both arrays and give the smallest sufficient remaining cookie to the least demanding unsatisfied child. Using a larger cookie cannot help that child more, while preserving larger cookies can help harder-to-satisfy children.",
    "timeComplexity": "O(g log g + s log s)",
    "spaceComplexity": "O(log g + log s) sorting stack",
    "pitfall": "A cookie smaller than the easiest remaining child can be discarded, but a satisfied child advances only once.",
    "followUp": "What exchange argument justifies choosing the smallest sufficient cookie?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findContentChildren(int[] g, int[] s) {\n        Arrays.sort(g);\n        Arrays.sort(s);\n        int child = 0;\n        for (int cookie : s)\n            if (child < g.length && cookie >= g[child]) child++;\n        return child;\n    }\n}\n",
    "testCode": "Solution x=new Solution();if(x.findContentChildren(new int[]{2,3},new int[]{1,2,4})!=2)throw new AssertionError();if(x.findContentChildren(new int[]{2},new int[]{})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Assign Cookies: what invariant or exchange argument makes the solution correct?",
        "back": "Sort both arrays and give the smallest sufficient remaining cookie to the least demanding unsatisfied child. Using a larger cookie cannot help that child more, while preserving larger cookies can help harder-to-satisfy children."
      },
      {
        "type": "Edge case",
        "front": "Assign Cookies: what implementation trap should you check before submitting?",
        "back": "A cookie smaller than the easiest remaining child can be discarded, but a satisfied child advances only once."
      },
      {
        "type": "Complexity",
        "front": "Assign Cookies: state the time and extra-space costs of this implementation.",
        "back": "Time: O(g log g + s log s). Extra space: O(log g + log s) sorting stack."
      }
    ]
  },
  {
    "id": "lc-406",
    "number": 406,
    "title": "Queue Reconstruction by Height",
    "slug": "queue-reconstruction-by-height",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Greedy",
    "url": "https://leetcode.com/problems/queue-reconstruction-by-height/",
    "context": "Input: people [height,k], where k is the number of people in front with height at least this height. A valid reconstruction is guaranteed. Return a queue satisfying every pair.",
    "examples": "[[5,0],[7,0],[5,1]] → [[5,0],[5,1],[7,0]].",
    "solution": "Sort by descending height and ascending k for equal heights. Insert each person at index k in a list. All already placed people are at least as tall, so index k gives exactly k qualifying predecessors; later shorter people do not change that count.",
    "timeComplexity": "O(n²) due to indexed ArrayList insertion",
    "spaceComplexity": "O(n)",
    "pitfall": "For equal heights sort k ascending. Descending k can request an insertion index beyond the current list size.",
    "followUp": "How could an order-statistics structure improve the reconstruction complexity?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[][] reconstructQueue(int[][] people) {\n        Arrays.sort(people, (a, b) ->\n            a[0] != b[0]\n                ? Integer.compare(b[0], a[0])\n                : Integer.compare(a[1], b[1])\n        );\n        List<int[]> out = new ArrayList<>();\n        for (int[] p : people) out.add(p[1], p.clone());\n        return out.toArray(new int[0][]);\n    }\n}\n",
    "testCode": "Solution s=new Solution();int[][]a=s.reconstructQueue(new int[][]{{5,0},{7,0},{5,1}});if(!Arrays.deepEquals(a,new int[][]{{5,0},{5,1},{7,0}}))throw new AssertionError();if(!Arrays.deepEquals(s.reconstructQueue(new int[][]{{4,0}}),new int[][]{{4,0}}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Queue Reconstruction by Height: what invariant or exchange argument makes the solution correct?",
        "back": "Sort by descending height and ascending k for equal heights. Insert each person at index k in a list. All already placed people are at least as tall, so index k gives exactly k qualifying predecessors; later shorter people do not change that count."
      },
      {
        "type": "Edge case",
        "front": "Queue Reconstruction by Height: what implementation trap should you check before submitting?",
        "back": "For equal heights sort k ascending. Descending k can request an insertion index beyond the current list size."
      },
      {
        "type": "Complexity",
        "front": "Queue Reconstruction by Height: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n²) due to indexed ArrayList insertion. Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-763",
    "number": 763,
    "title": "Partition Labels",
    "slug": "partition-labels",
    "difficulty": "Medium",
    "tags": "String, Greedy",
    "url": "https://leetcode.com/problems/partition-labels/",
    "context": "Input: a lowercase-English string. Split it into as many contiguous parts as possible such that each letter appears in only one part. Return part lengths.",
    "examples": "\"abacddc\" → [3,4], namely aba and cddc.",
    "solution": "Record the final position of every letter. While scanning a part, extend its required end to the farthest last occurrence of any letter seen. When the scan reaches that end, no letter in the part appears later, so cutting there is safe and maximizes the number of parts.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) excluding output",
    "pitfall": "Every newly encountered letter can extend the current boundary. Do not close a part using only its first letter last occurrence.",
    "followUp": "Why does taking the earliest safe cut never reduce the maximum number of later parts?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> partitionLabels(String s) {\n        int[] last = new int[26];\n        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n        List<Integer> out = new ArrayList<>();\n        int start = 0,\n            end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            end = Math.max(end, last[s.charAt(i) - 'a']);\n            if (i == end) {\n                out.add(i - start + 1);\n                start = i + 1;\n            }\n        }\n        return out;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.partitionLabels(\"abacddc\").equals(Arrays.asList(3,4)))throw new AssertionError();if(!s.partitionLabels(\"abc\").equals(Arrays.asList(1,1,1)))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Partition Labels: what invariant or exchange argument makes the solution correct?",
        "back": "Record the final position of every letter. While scanning a part, extend its required end to the farthest last occurrence of any letter seen. When the scan reaches that end, no letter in the part appears later, so cutting there is safe and maximizes the number of parts."
      },
      {
        "type": "Edge case",
        "front": "Partition Labels: what implementation trap should you check before submitting?",
        "back": "Every newly encountered letter can extend the current boundary. Do not close a part using only its first letter last occurrence."
      },
      {
        "type": "Complexity",
        "front": "Partition Labels: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1) excluding output."
      }
    ]
  },
  {
    "id": "lc-881",
    "number": 881,
    "title": "Boats to Save People",
    "slug": "boats-to-save-people",
    "difficulty": "Medium",
    "tags": "Array, Sorting, Two pointers, Greedy",
    "url": "https://leetcode.com/problems/boats-to-save-people/",
    "context": "Input: positive person weights and a boat weight limit at least every individual weight. Each boat holds at most two people. Return the minimum boat count.",
    "examples": "weights=[1,2,2,3], limit=3 → 3 boats: [3], [1,2], [2].",
    "solution": "Sort and assign the heaviest remaining person a boat. Pair with the lightest person if possible; otherwise the heaviest must travel alone because nobody else is lighter. This greedy step never uses more boats than an optimal pairing.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(log n) sorting stack",
    "pitfall": "The two-person limit is essential. This greedy rule is not a solution to general bin packing with unlimited passengers.",
    "followUp": "Why is testing the lightest partner enough to decide whether the heaviest must go alone?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numRescueBoats(int[] people, int limit) {\n        Arrays.sort(people);\n        int l = 0,\n            r = people.length - 1,\n            boats = 0;\n        while (l <= r) {\n            if (l < r && people[l] + people[r] <= limit) l++;\n            r--;\n            boats++;\n        }\n        return boats;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.numRescueBoats(new int[]{1,2,2,3},3)!=3)throw new AssertionError();if(s.numRescueBoats(new int[]{2},2)!=1)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Boats to Save People: what invariant or exchange argument makes the solution correct?",
        "back": "Sort and assign the heaviest remaining person a boat. Pair with the lightest person if possible; otherwise the heaviest must travel alone because nobody else is lighter. This greedy step never uses more boats than an optimal pairing."
      },
      {
        "type": "Edge case",
        "front": "Boats to Save People: what implementation trap should you check before submitting?",
        "back": "The two-person limit is essential. This greedy rule is not a solution to general bin packing with unlimited passengers."
      },
      {
        "type": "Complexity",
        "front": "Boats to Save People: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log n). Extra space: O(log n) sorting stack."
      }
    ]
  },
  {
    "id": "lc-179",
    "number": 179,
    "title": "Largest Number",
    "slug": "largest-number",
    "difficulty": "Medium",
    "tags": "Array, Sorting, String",
    "url": "https://leetcode.com/problems/largest-number/",
    "context": "Input: nonnegative integers. Rearrange their decimal representations so concatenation is as large as possible and return it as a string. The output may be too large for numeric types.",
    "examples": "[9,34,3] → \"9343\" because 343 exceeds 334.",
    "solution": "Sort strings by comparing b+a with a+b, placing a first exactly when a+b is larger. This pairwise ordering prevents any adjacent swap from improving the concatenation. Join in that order and normalize an all-zero result.",
    "timeComplexity": "O(n log n × d), d is maximum decimal digits",
    "spaceComplexity": "O(nd)",
    "pitfall": "Numeric descending order is incorrect: 3 should precede 30. Return \"0\" for inputs containing only zeros.",
    "followUp": "Why does lexicographic comparison work when the two concatenations have equal length?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String largestNumber(int[] nums) {\n        String[] s = new String[nums.length];\n        for (int i = 0; i < nums.length; i++) s[i] = Integer.toString(nums[i]);\n        Arrays.sort(s, (a, b) -> (b + a).compareTo(a + b));\n        if (s[0].equals(\"0\")) return \"0\";\n        return String.join(\"\", s);\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.largestNumber(new int[]{9,34,3}).equals(\"9343\"))throw new AssertionError();if(!s.largestNumber(new int[]{0,0}).equals(\"0\"))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Largest Number: what invariant or exchange argument makes the solution correct?",
        "back": "Sort strings by comparing b+a with a+b, placing a first exactly when a+b is larger. This pairwise ordering prevents any adjacent swap from improving the concatenation. Join in that order and normalize an all-zero result."
      },
      {
        "type": "Edge case",
        "front": "Largest Number: what implementation trap should you check before submitting?",
        "back": "Numeric descending order is incorrect: 3 should precede 30. Return \"0\" for inputs containing only zeros."
      },
      {
        "type": "Complexity",
        "front": "Largest Number: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n log n × d), d is maximum decimal digits. Extra space: O(nd)."
      }
    ]
  },
  {
    "id": "lc-274",
    "number": 274,
    "title": "H-Index",
    "slug": "h-index",
    "difficulty": "Medium",
    "tags": "Array, Counting",
    "url": "https://leetcode.com/problems/h-index/",
    "context": "Input: nonnegative citation counts for a researcher papers. Return the largest h such that at least h papers each have at least h citations.",
    "examples": "[4,0,5,2,6] → 3: three papers have at least three citations.",
    "solution": "Bucket citation counts at min(count,n), because h cannot exceed the number of papers. Scan thresholds downward while accumulating how many papers meet them. The first threshold with enough papers is the largest feasible h.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "The h-index need not equal any existing citation count. Cap large counts at n to keep the bucket array bounded.",
    "followUp": "How would sorting provide an alternative O(n log n) solution?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int hIndex(int[] citations) {\n        int n = citations.length;\n        int[] buckets = new int[n + 1];\n        for (int c : citations) buckets[Math.min(c, n)]++;\n        int papers = 0;\n        for (int h = n; h >= 0; h--) {\n            papers += buckets[h];\n            if (papers >= h) return h;\n        }\n        return 0;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(s.hIndex(new int[]{4,0,5,2,6})!=3)throw new AssertionError();if(s.hIndex(new int[]{0,0})!=0)throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "H-Index: what invariant or exchange argument makes the solution correct?",
        "back": "Bucket citation counts at min(count,n), because h cannot exceed the number of papers. Scan thresholds downward while accumulating how many papers meet them. The first threshold with enough papers is the largest feasible h."
      },
      {
        "type": "Edge case",
        "front": "H-Index: what implementation trap should you check before submitting?",
        "back": "The h-index need not equal any existing citation count. Cap large counts at n to keep the bucket array bounded."
      },
      {
        "type": "Complexity",
        "front": "H-Index: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(n)."
      }
    ]
  },
  {
    "id": "lc-334",
    "number": 334,
    "title": "Increasing Triplet Subsequence",
    "slug": "increasing-triplet-subsequence",
    "difficulty": "Medium",
    "tags": "Array, Greedy",
    "url": "https://leetcode.com/problems/increasing-triplet-subsequence/",
    "context": "Input: signed integers in arbitrary order. Return whether indices i<j<k exist with nums[i]<nums[j]<nums[k]. The selected values need not be adjacent. Aim for linear time and constant extra space.",
    "examples": "[5,1,4,2,3] → true from 1,2,3; [3,2,1] → false.",
    "solution": "Maintain the smallest first value and the smallest possible tail of an increasing pair seen so far. A value larger than both completes a triplet. Updating first later does not invalidate the earlier witness behind second.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Use <= when updating first and second so equal values do not create a strictly increasing subsequence.",
    "followUp": "Why can first and second stop representing the same pair while the existence argument remains valid?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean increasingTriplet(int[] nums) {\n        int first = Integer.MAX_VALUE,\n            second = Integer.MAX_VALUE;\n        for (int x : nums) {\n            if (x <= first) first = x;\n            else if (x <= second) second = x;\n            else return true;\n        }\n        return false;\n    }\n}\n",
    "testCode": "Solution s=new Solution();if(!s.increasingTriplet(new int[]{5,1,4,2,3}))throw new AssertionError();if(s.increasingTriplet(new int[]{2,2,2}))throw new AssertionError();",
    "cards": [
      {
        "type": "Key insight",
        "front": "Increasing Triplet Subsequence: what invariant or exchange argument makes the solution correct?",
        "back": "Maintain the smallest first value and the smallest possible tail of an increasing pair seen so far. A value larger than both completes a triplet. Updating first later does not invalidate the earlier witness behind second."
      },
      {
        "type": "Edge case",
        "front": "Increasing Triplet Subsequence: what implementation trap should you check before submitting?",
        "back": "Use <= when updating first and second so equal values do not create a strictly increasing subsequence."
      },
      {
        "type": "Complexity",
        "front": "Increasing Triplet Subsequence: state the time and extra-space costs of this implementation.",
        "back": "Time: O(n). Extra space: O(1)."
      }
    ]
  }
];
