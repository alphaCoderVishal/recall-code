// Original curated study guides; source provenance is in docs/research-structures.md
export default [
  {
    "id": "lc-2",
    "number": 2,
    "title": "Add Two Numbers",
    "slug": "add-two-numbers",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Two nonempty lists store nonnegative integers least-significant digit first. Return their sum in the same representation; each node is one decimal digit.",
    "examples": "[8,1] + [7] represents 18+7 and yields [5,2].",
    "solution": "Walk both lists with a carry. Each output digit is the current sum modulo ten; division by ten carries exactly the unrepresented portion.",
    "timeComplexity": "O(m+n)",
    "spaceComplexity": "O(1), excluding output",
    "pitfall": "Continue while carry remains after both lists end.",
    "followUp": "Explain how most-significant-first storage changes the algorithm.",
    "sourceUrl": "https://leetcode.com/problems/add-two-numbers/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode addTwoNumbers(ListNode a, ListNode b) {\n        ListNode d = new ListNode(0),\n            t = d;\n        int c = 0;\n        while (a != null || b != null || c != 0) {\n            if (a != null) {\n                c += a.val;\n                a = a.next;\n            }\n            if (b != null) {\n                c += b.val;\n                b = b.next;\n            }\n            t.next = new ListNode(c % 10);\n            t = t.next;\n            c /= 10;\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Add Two Numbers: what invariant makes the approach work?",
        "back": "Walk both lists with a carry. Each output digit is the current sum modulo ten; division by ten carries exactly the unrepresented portion."
      },
      {
        "type": "Complexity",
        "front": "Add Two Numbers: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(m+n). Auxiliary space: O(1), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Add Two Numbers: what implementation trap should you check before submitting?",
        "back": "Continue while carry remains after both lists end."
      },
      {
        "type": "Algorithm steps",
        "front": "Add Two Numbers: trace the algorithm on a small example, including its intermediate state.",
        "back": "[8,1] + [7] represents 18+7 and yields [5,2].\n\nWalk both lists with a carry. Each output digit is the current sum modulo ten; division by ten carries exactly the unrepresented portion."
      }
    ],
    "testCode": "if (!(new Solution().addTwoNumbers(new ListNode(9),new ListNode(1)).next.val==1)) throw new AssertionError(\"LC 2 failed\");\nif (!(new Solution().addTwoNumbers(new ListNode(0),new ListNode(0)).val==0)) throw new AssertionError(\"LC 2 failed\");"
  },
  {
    "id": "lc-19",
    "number": 19,
    "title": "Remove Nth Node From End of List",
    "slug": "remove-nth-node-from-end-of-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Given a nonempty singly linked list and a valid n between one and its length, remove the nth node counted from the tail and return the head.",
    "examples": "[4,7,9], n=3 becomes [7,9].",
    "solution": "Start at a dummy predecessor. Advance fast n nodes, then move both until fast reaches the tail; slow then precedes the node to remove.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Removing the head requires returning dummy.next.",
    "followUp": "Prove why the pointer gap identifies the predecessor.",
    "sourceUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode d = new ListNode(0, head),\n            f = d,\n            s = d;\n        for (int i = 0; i < n; i++) f = f.next;\n        while (f.next != null) {\n            f = f.next;\n            s = s.next;\n        }\n        s.next = s.next.next;\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Nth Node From End of List: what invariant makes the approach work?",
        "back": "Start at a dummy predecessor. Advance fast n nodes, then move both until fast reaches the tail; slow then precedes the node to remove."
      },
      {
        "type": "Complexity",
        "front": "Remove Nth Node From End of List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Remove Nth Node From End of List: what implementation trap should you check before submitting?",
        "back": "Removing the head requires returning dummy.next."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove Nth Node From End of List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[4,7,9], n=3 becomes [7,9].\n\nStart at a dummy predecessor. Advance fast n nodes, then move both until fast reaches the tail; slow then precedes the node to remove."
      }
    ],
    "testCode": "if (!(new Solution().removeNthFromEnd(new ListNode(1),1)==null)) throw new AssertionError(\"LC 19 failed\");\nif (!(new Solution().removeNthFromEnd(new ListNode(4,new ListNode(7)),2).val==7)) throw new AssertionError(\"LC 19 failed\");"
  },
  {
    "id": "lc-21",
    "number": 21,
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Merge two ascending singly linked lists, reusing their nodes, into one ascending list. Either input may be empty.",
    "examples": "[1,6] and [2,4] become [1,2,4,6].",
    "solution": "Maintain a tail for the merged prefix. Append the smaller remaining head; because each input is sorted, it is globally the next smallest node.",
    "timeComplexity": "O(m+n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Attach the whole remainder when one input ends.",
    "followUp": "Compare iterative constant-space merging with recursive stack usage.",
    "sourceUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode mergeTwoLists(ListNode a, ListNode b) {\n        ListNode d = new ListNode(0),\n            t = d;\n        while (a != null && b != null) {\n            if (a.val <= b.val) {\n                t.next = a;\n                a = a.next;\n            } else {\n                t.next = b;\n                b = b.next;\n            }\n            t = t.next;\n        }\n        t.next = a != null ? a : b;\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Merge Two Sorted Lists: what invariant makes the approach work?",
        "back": "Maintain a tail for the merged prefix. Append the smaller remaining head; because each input is sorted, it is globally the next smallest node."
      },
      {
        "type": "Complexity",
        "front": "Merge Two Sorted Lists: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(m+n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Merge Two Sorted Lists: what implementation trap should you check before submitting?",
        "back": "Attach the whole remainder when one input ends."
      },
      {
        "type": "Algorithm steps",
        "front": "Merge Two Sorted Lists: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,6] and [2,4] become [1,2,4,6].\n\nMaintain a tail for the merged prefix. Append the smaller remaining head; because each input is sorted, it is globally the next smallest node."
      }
    ],
    "testCode": "if (!(new Solution().mergeTwoLists(null,null)==null)) throw new AssertionError(\"LC 21 failed\");\nif (!(new Solution().mergeTwoLists(new ListNode(3),new ListNode(1)).next.val==3)) throw new AssertionError(\"LC 21 failed\");"
  },
  {
    "id": "lc-23",
    "number": 23,
    "title": "Merge k Sorted Lists",
    "slug": "merge-k-sorted-lists",
    "difficulty": "Hard",
    "tags": "Linked list, Heap",
    "context": "Given an array of ascending linked lists, merge their nodes into a single ascending list. Lists and the array may be empty.",
    "examples": "[[],[2,5],[1,4]] becomes [1,2,4,5].",
    "solution": "Keep each nonempty list head in a min-heap. Extracting the minimum emits the next global value; insert that node’s successor to preserve the frontier.",
    "timeComplexity": "O(N log k), N total nodes",
    "spaceComplexity": "O(k)",
    "pitfall": "Skip null heads and use Integer.compare instead of subtracting values.",
    "followUp": "Describe a pairwise divide-and-conquer merge with the same time bound.",
    "sourceUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode mergeKLists(ListNode[] lists) {\n        PriorityQueue<ListNode> q = new PriorityQueue<>((a, b) ->\n            Integer.compare(a.val, b.val)\n        );\n        for (ListNode n : lists) if (n != null) q.add(n);\n        ListNode d = new ListNode(0),\n            t = d;\n        while (!q.isEmpty()) {\n            ListNode n = q.remove();\n            t.next = n;\n            t = n;\n            if (n.next != null) q.add(n.next);\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Merge k Sorted Lists: what invariant makes the approach work?",
        "back": "Keep each nonempty list head in a min-heap. Extracting the minimum emits the next global value; insert that node’s successor to preserve the frontier."
      },
      {
        "type": "Complexity",
        "front": "Merge k Sorted Lists: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(N log k), N total nodes. Auxiliary space: O(k)."
      },
      {
        "type": "Edge case",
        "front": "Merge k Sorted Lists: what implementation trap should you check before submitting?",
        "back": "Skip null heads and use Integer.compare instead of subtracting values."
      },
      {
        "type": "Algorithm steps",
        "front": "Merge k Sorted Lists: trace the algorithm on a small example, including its intermediate state.",
        "back": "[[],[2,5],[1,4]] becomes [1,2,4,5].\n\nKeep each nonempty list head in a min-heap. Extracting the minimum emits the next global value; insert that node’s successor to preserve the frontier."
      }
    ],
    "testCode": "if (!(new Solution().mergeKLists(new ListNode[0])==null)) throw new AssertionError(\"LC 23 failed\");\nif (!(new Solution().mergeKLists(new ListNode[]{new ListNode(3),new ListNode(1)}).next.val==3)) throw new AssertionError(\"LC 23 failed\");"
  },
  {
    "id": "lc-24",
    "number": 24,
    "title": "Swap Nodes in Pairs",
    "slug": "swap-nodes-in-pairs",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Swap every adjacent pair of nodes in a singly linked list without swapping stored values. Leave an unmatched final node in place.",
    "examples": "[2,4,8] becomes [4,2,8].",
    "solution": "Track the predecessor of each pair. Reconnect predecessor to second, second to first, and first to the remainder, then advance to first.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Save the pair’s next node before rewiring links.",
    "followUp": "Generalize the operation to groups of k nodes.",
    "sourceUrl": "https://leetcode.com/problems/swap-nodes-in-pairs/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode swapPairs(ListNode head) {\n        ListNode d = new ListNode(0, head),\n            p = d;\n        while (p.next != null && p.next.next != null) {\n            ListNode a = p.next,\n                b = a.next;\n            a.next = b.next;\n            b.next = a;\n            p.next = b;\n            p = a;\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Swap Nodes in Pairs: what invariant makes the approach work?",
        "back": "Track the predecessor of each pair. Reconnect predecessor to second, second to first, and first to the remainder, then advance to first."
      },
      {
        "type": "Complexity",
        "front": "Swap Nodes in Pairs: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Swap Nodes in Pairs: what implementation trap should you check before submitting?",
        "back": "Save the pair’s next node before rewiring links."
      },
      {
        "type": "Algorithm steps",
        "front": "Swap Nodes in Pairs: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,4,8] becomes [4,2,8].\n\nTrack the predecessor of each pair. Reconnect predecessor to second, second to first, and first to the remainder, then advance to first."
      }
    ],
    "testCode": "if (!(new Solution().swapPairs(null)==null)) throw new AssertionError(\"LC 24 failed\");\nif (!(new Solution().swapPairs(new ListNode(2,new ListNode(4,new ListNode(8)))).val==4)) throw new AssertionError(\"LC 24 failed\");"
  },
  {
    "id": "lc-25",
    "number": 25,
    "title": "Reverse Nodes in k-Group",
    "slug": "reverse-nodes-in-kgroup",
    "difficulty": "Hard",
    "tags": "Linked list",
    "context": "Reverse complete groups of k nodes in a singly linked list, changing links only. Any final group smaller than k stays in its original order; k is positive.",
    "examples": "[1,2,3,4,5], k=3 becomes [3,2,1,4,5].",
    "solution": "First find the kth node to prove a full group exists. Reverse links until the saved successor, reconnect the group, and reuse the old first node as the next predecessor.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Do not reverse an incomplete last group.",
    "followUp": "Explain why setting the reversal predecessor to groupNext avoids a second reconnection.",
    "sourceUrl": "https://leetcode.com/problems/reverse-nodes-in-kgroup/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode reverseKGroup(ListNode head, int k) {\n        ListNode d = new ListNode(0, head),\n            p = d;\n        while (true) {\n            ListNode end = p;\n            for (int i = 0; i < k && end != null; i++) end = end.next;\n            if (end == null) break;\n            ListNode next = end.next,\n                cur = p.next,\n                prev = next;\n            while (cur != next) {\n                ListNode t = cur.next;\n                cur.next = prev;\n                prev = cur;\n                cur = t;\n            }\n            ListNode old = p.next;\n            p.next = end;\n            p = old;\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reverse Nodes in k-Group: what invariant makes the approach work?",
        "back": "First find the kth node to prove a full group exists. Reverse links until the saved successor, reconnect the group, and reuse the old first node as the next predecessor."
      },
      {
        "type": "Complexity",
        "front": "Reverse Nodes in k-Group: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Reverse Nodes in k-Group: what implementation trap should you check before submitting?",
        "back": "Do not reverse an incomplete last group."
      },
      {
        "type": "Algorithm steps",
        "front": "Reverse Nodes in k-Group: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,2,3,4,5], k=3 becomes [3,2,1,4,5].\n\nFirst find the kth node to prove a full group exists. Reverse links until the saved successor, reconnect the group, and reuse the old first node as the next predecessor."
      }
    ],
    "testCode": "if (!(new Solution().reverseKGroup(new ListNode(1),2).val==1)) throw new AssertionError(\"LC 25 failed\");\nif (!(new Solution().reverseKGroup(new ListNode(1,new ListNode(2)),2).val==2)) throw new AssertionError(\"LC 25 failed\");\nListNode a=new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,new ListNode(5)))));a=new Solution().reverseKGroup(a,3);int[] e={3,2,1,4,5};for(int v:e){if(a==null||a.val!=v)throw new AssertionError(\"groups\");a=a.next;}if(a!=null)throw new AssertionError(\"end\");"
  },
  {
    "id": "lc-61",
    "number": 61,
    "title": "Rotate List",
    "slug": "rotate-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Rotate a singly linked list to the right by nonnegative k positions and return its new head. Empty lists are allowed.",
    "examples": "[2,5,7], k=4 becomes [7,2,5].",
    "solution": "Measure length and reduce k modulo it. Temporarily link tail to head; the new tail is length-k-1 steps from the old head, where the cycle is cut.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Handle an empty list before taking k modulo length.",
    "followUp": "Derive the new-tail position for a left rotation.",
    "sourceUrl": "https://leetcode.com/problems/rotate-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode rotateRight(ListNode head, int k) {\n        if (head == null) return null;\n        int n = 1;\n        ListNode t = head;\n        while (t.next != null) {\n            t = t.next;\n            n++;\n        }\n        k %= n;\n        t.next = head;\n        for (int i = 0; i < n - k; i++) t = t.next;\n        ListNode h = t.next;\n        t.next = null;\n        return h;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Rotate List: what invariant makes the approach work?",
        "back": "Measure length and reduce k modulo it. Temporarily link tail to head; the new tail is length-k-1 steps from the old head, where the cycle is cut."
      },
      {
        "type": "Complexity",
        "front": "Rotate List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Rotate List: what implementation trap should you check before submitting?",
        "back": "Handle an empty list before taking k modulo length."
      },
      {
        "type": "Algorithm steps",
        "front": "Rotate List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,5,7], k=4 becomes [7,2,5].\n\nMeasure length and reduce k modulo it. Temporarily link tail to head; the new tail is length-k-1 steps from the old head, where the cycle is cut."
      }
    ],
    "testCode": "if (!(new Solution().rotateRight(null,9)==null)) throw new AssertionError(\"LC 61 failed\");\nif (!(new Solution().rotateRight(new ListNode(2,new ListNode(5,new ListNode(7))),4).val==7)) throw new AssertionError(\"LC 61 failed\");"
  },
  {
    "id": "lc-82",
    "number": 82,
    "title": "Remove Duplicates from Sorted List II",
    "slug": "remove-duplicates-from-sorted-list-ii",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "From an ascending list remove every value that occurs more than once, retaining only values that appeared exactly once.",
    "examples": "[1,1,2,4,4,5] becomes [2,5].",
    "solution": "A dummy node anchors the retained prefix. Detect equal-value runs; bypass an entire repeated run or advance the retained predecessor for a unique node.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Keeping one member of a repeated run solves a different problem.",
    "followUp": "Explain why sorted order lets a local run prove global duplication.",
    "sourceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode deleteDuplicates(ListNode head) {\n        ListNode d = new ListNode(0, head),\n            p = d;\n        while (head != null) {\n            if (head.next != null && head.val == head.next.val) {\n                int v = head.val;\n                while (head != null && head.val == v) head = head.next;\n                p.next = head;\n            } else {\n                p = head;\n                head = head.next;\n            }\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Duplicates from Sorted List II: what invariant makes the approach work?",
        "back": "A dummy node anchors the retained prefix. Detect equal-value runs; bypass an entire repeated run or advance the retained predecessor for a unique node."
      },
      {
        "type": "Complexity",
        "front": "Remove Duplicates from Sorted List II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Remove Duplicates from Sorted List II: what implementation trap should you check before submitting?",
        "back": "Keeping one member of a repeated run solves a different problem."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove Duplicates from Sorted List II: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,1,2,4,4,5] becomes [2,5].\n\nA dummy node anchors the retained prefix. Detect equal-value runs; bypass an entire repeated run or advance the retained predecessor for a unique node."
      }
    ],
    "testCode": "if (!(new Solution().deleteDuplicates(new ListNode(1,new ListNode(1)))==null)) throw new AssertionError(\"LC 82 failed\");\nif (!(new Solution().deleteDuplicates(new ListNode(1,new ListNode(2))).next.val==2)) throw new AssertionError(\"LC 82 failed\");"
  },
  {
    "id": "lc-83",
    "number": 83,
    "title": "Remove Duplicates from Sorted List",
    "slug": "remove-duplicates-from-sorted-list",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Compact an ascending linked list so each distinct value appears once, reusing existing nodes.",
    "examples": "[2,2,3,3,3] becomes [2,3].",
    "solution": "At each node bypass an equal successor without advancing; advance only when the successor differs so the entire run is consumed.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Advancing immediately after deletion can leave a third duplicate behind.",
    "followUp": "Contrast keeping one copy with deleting all repeated values.",
    "sourceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode deleteDuplicates(ListNode h) {\n        for (ListNode p = h; p != null && p.next != null; ) {\n            if (p.val == p.next.val) p.next = p.next.next;\n            else p = p.next;\n        }\n        return h;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Duplicates from Sorted List: what invariant makes the approach work?",
        "back": "At each node bypass an equal successor without advancing; advance only when the successor differs so the entire run is consumed."
      },
      {
        "type": "Complexity",
        "front": "Remove Duplicates from Sorted List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Remove Duplicates from Sorted List: what implementation trap should you check before submitting?",
        "back": "Advancing immediately after deletion can leave a third duplicate behind."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove Duplicates from Sorted List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,2,3,3,3] becomes [2,3].\n\nAt each node bypass an equal successor without advancing; advance only when the successor differs so the entire run is consumed."
      }
    ],
    "testCode": "if (!(new Solution().deleteDuplicates(null)==null)) throw new AssertionError(\"LC 83 failed\");\nif (!(new Solution().deleteDuplicates(new ListNode(2,new ListNode(2))).next==null)) throw new AssertionError(\"LC 83 failed\");"
  },
  {
    "id": "lc-86",
    "number": 86,
    "title": "Partition List",
    "slug": "partition-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Reorder a list so nodes with value below x precede nodes at least x. Preserve original order within both groups.",
    "examples": "[4,1,3,2], x=3 becomes [1,2,4,3].",
    "solution": "Build two stable chains using dummy heads, appending each encountered node to its group. End the high chain and concatenate it after the low chain.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Set the high tail’s next to null or an old link can create a cycle.",
    "followUp": "Explain why swapping values would not preserve node identity.",
    "sourceUrl": "https://leetcode.com/problems/partition-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode partition(ListNode h, int x) {\n        ListNode a = new ListNode(0),\n            b = new ListNode(0),\n            p = a,\n            q = b;\n        while (h != null) {\n            if (h.val < x) {\n                p.next = h;\n                p = h;\n            } else {\n                q.next = h;\n                q = h;\n            }\n            h = h.next;\n        }\n        q.next = null;\n        p.next = b.next;\n        return a.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Partition List: what invariant makes the approach work?",
        "back": "Build two stable chains using dummy heads, appending each encountered node to its group. End the high chain and concatenate it after the low chain."
      },
      {
        "type": "Complexity",
        "front": "Partition List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Partition List: what implementation trap should you check before submitting?",
        "back": "Set the high tail’s next to null or an old link can create a cycle."
      },
      {
        "type": "Algorithm steps",
        "front": "Partition List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[4,1,3,2], x=3 becomes [1,2,4,3].\n\nBuild two stable chains using dummy heads, appending each encountered node to its group. End the high chain and concatenate it after the low chain."
      }
    ],
    "testCode": "if (!(new Solution().partition(null,3)==null)) throw new AssertionError(\"LC 86 failed\");\nif (!(new Solution().partition(new ListNode(4,new ListNode(1)),3).next.val==4)) throw new AssertionError(\"LC 86 failed\");"
  },
  {
    "id": "lc-92",
    "number": 92,
    "title": "Reverse Linked List II",
    "slug": "reverse-linked-list-ii",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Reverse the segment between valid one-based positions left and right, leaving the rest of the list unchanged.",
    "examples": "[1,2,3,4], left=2,right=3 becomes [1,3,2,4].",
    "solution": "Stop before left. Repeatedly remove the node immediately after the segment’s original first node and insert it at the front of the segment.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Use a dummy predecessor when left is one.",
    "followUp": "Compare head insertion to reversing links using a saved suffix pointer.",
    "sourceUrl": "https://leetcode.com/problems/reverse-linked-list-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode reverseBetween(ListNode h, int left, int right) {\n        ListNode d = new ListNode(0, h),\n            p = d;\n        for (int i = 1; i < left; i++) p = p.next;\n        ListNode t = p.next;\n        for (int i = 0; i < right - left; i++) {\n            ListNode a = t.next;\n            t.next = a.next;\n            a.next = p.next;\n            p.next = a;\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reverse Linked List II: what invariant makes the approach work?",
        "back": "Stop before left. Repeatedly remove the node immediately after the segment’s original first node and insert it at the front of the segment."
      },
      {
        "type": "Complexity",
        "front": "Reverse Linked List II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Reverse Linked List II: what implementation trap should you check before submitting?",
        "back": "Use a dummy predecessor when left is one."
      },
      {
        "type": "Algorithm steps",
        "front": "Reverse Linked List II: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,2,3,4], left=2,right=3 becomes [1,3,2,4].\n\nStop before left. Repeatedly remove the node immediately after the segment’s original first node and insert it at the front of the segment."
      }
    ],
    "testCode": "if (!(new Solution().reverseBetween(new ListNode(1),1,1).val==1)) throw new AssertionError(\"LC 92 failed\");\nif (!(new Solution().reverseBetween(new ListNode(1,new ListNode(2)),1,2).val==2)) throw new AssertionError(\"LC 92 failed\");"
  },
  {
    "id": "lc-141",
    "number": 141,
    "title": "Linked List Cycle",
    "slug": "linked-list-cycle",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Determine whether following next pointers eventually revisits the same node. Node identity matters; duplicate values alone do not indicate a cycle.",
    "examples": "A single node pointing to itself returns true; a single terminal node returns false.",
    "solution": "Move slow once and fast twice. In a cycle their relative position advances by one each round and must coincide; in an acyclic list fast reaches null.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Check fast and fast.next before taking two steps.",
    "followUp": "Prove the collision occurs within one cycle length after both pointers enter it.",
    "sourceUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean hasCycle(ListNode h) {\n        ListNode s = h,\n            f = h;\n        while (f != null && f.next != null) {\n            s = s.next;\n            f = f.next.next;\n            if (s == f) return true;\n        }\n        return false;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Linked List Cycle: what invariant makes the approach work?",
        "back": "Move slow once and fast twice. In a cycle their relative position advances by one each round and must coincide; in an acyclic list fast reaches null."
      },
      {
        "type": "Complexity",
        "front": "Linked List Cycle: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Linked List Cycle: what implementation trap should you check before submitting?",
        "back": "Check fast and fast.next before taking two steps."
      },
      {
        "type": "Algorithm steps",
        "front": "Linked List Cycle: trace the algorithm on a small example, including its intermediate state.",
        "back": "A single node pointing to itself returns true; a single terminal node returns false.\n\nMove slow once and fast twice. In a cycle their relative position advances by one each round and must coincide; in an acyclic list fast reaches null."
      }
    ],
    "testCode": "if (!(!new Solution().hasCycle(new ListNode(1)))) throw new AssertionError(\"LC 141 failed\");\nif (!(!new Solution().hasCycle(null))) throw new AssertionError(\"LC 141 failed\");\nListNode a=new ListNode(2),b=new ListNode(2);a.next=b;b.next=a;if(!new Solution().hasCycle(a))throw new AssertionError(\"cycle identity\");"
  },
  {
    "id": "lc-142",
    "number": 142,
    "title": "Linked List Cycle II",
    "slug": "linked-list-cycle-ii",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Return the first node of a cycle reachable from head, or null when no cycle exists. Do not change the list.",
    "examples": "For 1→2→3→2, return the node holding 2, not a new node with that value.",
    "solution": "Find a Floyd collision. Reset one pointer to head and advance both one step; the distance equations make them meet at the cycle entry.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Compare references rather than values.",
    "followUp": "Derive why head-to-entry equals collision-to-entry modulo cycle length.",
    "sourceUrl": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode detectCycle(ListNode h) {\n        ListNode s = h,\n            f = h;\n        while (f != null && f.next != null) {\n            s = s.next;\n            f = f.next.next;\n            if (s == f) {\n                s = h;\n                while (s != f) {\n                    s = s.next;\n                    f = f.next;\n                }\n                return s;\n            }\n        }\n        return null;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Linked List Cycle II: what invariant makes the approach work?",
        "back": "Find a Floyd collision. Reset one pointer to head and advance both one step; the distance equations make them meet at the cycle entry."
      },
      {
        "type": "Complexity",
        "front": "Linked List Cycle II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Linked List Cycle II: what implementation trap should you check before submitting?",
        "back": "Compare references rather than values."
      },
      {
        "type": "Algorithm steps",
        "front": "Linked List Cycle II: trace the algorithm on a small example, including its intermediate state.",
        "back": "For 1→2→3→2, return the node holding 2, not a new node with that value.\n\nFind a Floyd collision. Reset one pointer to head and advance both one step; the distance equations make them meet at the cycle entry."
      }
    ],
    "testCode": "if (!(new Solution().detectCycle(null)==null)) throw new AssertionError(\"LC 142 failed\");\nif (!(new Solution().detectCycle(new ListNode(7))==null)) throw new AssertionError(\"LC 142 failed\");\nListNode a=new ListNode(1),b=new ListNode(2),c=new ListNode(3);a.next=b;b.next=c;c.next=b;if(new Solution().detectCycle(a)!=b)throw new AssertionError(\"cycle entry\");"
  },
  {
    "id": "lc-143",
    "number": 143,
    "title": "Reorder List",
    "slug": "reorder-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Rewire a list in-place to alternate first, last, second, second-last, and so on. Preserve values and return no new list.",
    "examples": "[1,2,3,4,5] becomes [1,5,2,4,3].",
    "solution": "Split after the first half, reverse the second half, then alternate nodes. Each half supplies its next needed end in constant time.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Disconnect the halves before weaving to avoid cycles.",
    "followUp": "Why should the first half have the extra node for odd lengths?",
    "sourceUrl": "https://leetcode.com/problems/reorder-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void reorderList(ListNode h) {\n        if (h == null) return;\n        ListNode s = h,\n            f = h;\n        while (f.next != null && f.next.next != null) {\n            s = s.next;\n            f = f.next.next;\n        }\n        ListNode b = s.next;\n        s.next = null;\n        ListNode p = null;\n        while (b != null) {\n            ListNode n = b.next;\n            b.next = p;\n            p = b;\n            b = n;\n        }\n        while (p != null) {\n            ListNode x = h.next,\n                y = p.next;\n            h.next = p;\n            p.next = x;\n            h = x;\n            p = y;\n        }\n    }\n\n    public boolean verify(int n) {\n        ListNode a = new ListNode(1);\n        if (n == 2) a.next = new ListNode(2);\n        reorderList(a);\n        return (\n            a.val == 1 &&\n            (n == 1 ? a.next == null : a.next.val == 2 && a.next.next == null)\n        );\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reorder List: what invariant makes the approach work?",
        "back": "Split after the first half, reverse the second half, then alternate nodes. Each half supplies its next needed end in constant time."
      },
      {
        "type": "Complexity",
        "front": "Reorder List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Reorder List: what implementation trap should you check before submitting?",
        "back": "Disconnect the halves before weaving to avoid cycles."
      },
      {
        "type": "Algorithm steps",
        "front": "Reorder List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,2,3,4,5] becomes [1,5,2,4,3].\n\nSplit after the first half, reverse the second half, then alternate nodes. Each half supplies its next needed end in constant time."
      }
    ],
    "testCode": "if (!(new Solution().verify(1))) throw new AssertionError(\"LC 143 failed\");\nif (!(new Solution().verify(2))) throw new AssertionError(\"LC 143 failed\");\nListNode a=new ListNode(1,new ListNode(2,new ListNode(3,new ListNode(4,new ListNode(5)))));new Solution().reorderList(a);int[] expected={1,5,2,4,3};for(int v:expected){if(a==null||a.val!=v)throw new AssertionError(\"weave\");a=a.next;}if(a!=null)throw new AssertionError(\"termination\");"
  },
  {
    "id": "lc-147",
    "number": 147,
    "title": "Insertion Sort List",
    "slug": "insertion-sort-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Sort a singly linked list in ascending order using insertion sort. Insert each original node into its proper position in a growing sorted chain.",
    "examples": "[3,1,2] becomes [1,2,3].",
    "solution": "Detach one input node at a time. Find the last sorted-prefix node with a value no larger than it and splice after that predecessor.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(1)",
    "pitfall": "Save the input successor before changing current.next.",
    "followUp": "When is insertion sort attractive compared with merge sort?",
    "sourceUrl": "https://leetcode.com/problems/insertion-sort-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode insertionSortList(ListNode h) {\n        ListNode d = new ListNode(0);\n        while (h != null) {\n            ListNode next = h.next,\n                p = d;\n            while (p.next != null && p.next.val <= h.val) p = p.next;\n            h.next = p.next;\n            p.next = h;\n            h = next;\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Insertion Sort List: what invariant makes the approach work?",
        "back": "Detach one input node at a time. Find the last sorted-prefix node with a value no larger than it and splice after that predecessor."
      },
      {
        "type": "Complexity",
        "front": "Insertion Sort List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n²). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Insertion Sort List: what implementation trap should you check before submitting?",
        "back": "Save the input successor before changing current.next."
      },
      {
        "type": "Algorithm steps",
        "front": "Insertion Sort List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[3,1,2] becomes [1,2,3].\n\nDetach one input node at a time. Find the last sorted-prefix node with a value no larger than it and splice after that predecessor."
      }
    ],
    "testCode": "if (!(new Solution().insertionSortList(null)==null)) throw new AssertionError(\"LC 147 failed\");\nif (!(new Solution().insertionSortList(new ListNode(3,new ListNode(1))).val==1)) throw new AssertionError(\"LC 147 failed\");"
  },
  {
    "id": "lc-148",
    "number": 148,
    "title": "Sort List",
    "slug": "sort-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Sort a singly linked list in ascending order. Target O(n log n) time; the shown top-down merge sort uses recursion space.",
    "examples": "[5,2,4] becomes [2,4,5].",
    "solution": "Split the list into disjoint halves, recursively sort each, and merge sorted heads. Balanced splitting yields logarithmic levels with linear work per level.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(log n)",
    "pitfall": "Cut slow.next before recursing or the first half never shrinks.",
    "followUp": "Implement bottom-up merging to reduce auxiliary space to O(1).",
    "sourceUrl": "https://leetcode.com/problems/sort-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode sortList(ListNode h) {\n        if (h == null || h.next == null) return h;\n        ListNode s = h,\n            f = h.next;\n        while (f != null && f.next != null) {\n            s = s.next;\n            f = f.next.next;\n        }\n        ListNode b = s.next;\n        s.next = null;\n        return merge(sortList(h), sortList(b));\n    }\n\n    ListNode merge(ListNode a, ListNode b) {\n        ListNode d = new ListNode(0),\n            t = d;\n        while (a != null && b != null) {\n            if (a.val <= b.val) {\n                t.next = a;\n                a = a.next;\n            } else {\n                t.next = b;\n                b = b.next;\n            }\n            t = t.next;\n        }\n        t.next = a == null ? b : a;\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Sort List: what invariant makes the approach work?",
        "back": "Split the list into disjoint halves, recursively sort each, and merge sorted heads. Balanced splitting yields logarithmic levels with linear work per level."
      },
      {
        "type": "Complexity",
        "front": "Sort List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n log n). Auxiliary space: O(log n)."
      },
      {
        "type": "Edge case",
        "front": "Sort List: what implementation trap should you check before submitting?",
        "back": "Cut slow.next before recursing or the first half never shrinks."
      },
      {
        "type": "Algorithm steps",
        "front": "Sort List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[5,2,4] becomes [2,4,5].\n\nSplit the list into disjoint halves, recursively sort each, and merge sorted heads. Balanced splitting yields logarithmic levels with linear work per level."
      }
    ],
    "testCode": "if (!(new Solution().sortList(null)==null)) throw new AssertionError(\"LC 148 failed\");\nif (!(new Solution().sortList(new ListNode(5,new ListNode(2))).val==2)) throw new AssertionError(\"LC 148 failed\");"
  },
  {
    "id": "lc-160",
    "number": 160,
    "title": "Intersection of Two Linked Lists",
    "slug": "intersection-of-two-linked-lists",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Given two acyclic singly linked lists, return their first shared node by identity, or null if they do not share a suffix. Do not modify either list.",
    "examples": "Two distinct nodes both holding 3 do not intersect. A shared tail object does.",
    "solution": "Switch each pointer to the other head when it reaches null. Both travel the same combined distance, aligning unequal prefixes before entering the shared suffix.",
    "timeComplexity": "O(m+n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Value equality does not establish intersection.",
    "followUp": "Prove termination when the lists are disjoint.",
    "sourceUrl": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode getIntersectionNode(ListNode a, ListNode b) {\n        ListNode p = a,\n            q = b;\n        while (p != q) {\n            p = p == null ? b : p.next;\n            q = q == null ? a : q.next;\n        }\n        return p;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Intersection of Two Linked Lists: what invariant makes the approach work?",
        "back": "Switch each pointer to the other head when it reaches null. Both travel the same combined distance, aligning unequal prefixes before entering the shared suffix."
      },
      {
        "type": "Complexity",
        "front": "Intersection of Two Linked Lists: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(m+n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Intersection of Two Linked Lists: what implementation trap should you check before submitting?",
        "back": "Value equality does not establish intersection."
      },
      {
        "type": "Algorithm steps",
        "front": "Intersection of Two Linked Lists: trace the algorithm on a small example, including its intermediate state.",
        "back": "Two distinct nodes both holding 3 do not intersect. A shared tail object does.\n\nSwitch each pointer to the other head when it reaches null. Both travel the same combined distance, aligning unequal prefixes before entering the shared suffix."
      }
    ],
    "testCode": "if (!(new Solution().getIntersectionNode(new ListNode(1),new ListNode(1))==null)) throw new AssertionError(\"LC 160 failed\");\nif (!(new Solution().getIntersectionNode(null,null)==null)) throw new AssertionError(\"LC 160 failed\");\nListNode tail=new ListNode(7);if(new Solution().getIntersectionNode(new ListNode(1,tail),new ListNode(2,tail))!=tail)throw new AssertionError(\"shared tail\");"
  },
  {
    "id": "lc-203",
    "number": 203,
    "title": "Remove Linked List Elements",
    "slug": "remove-linked-list-elements",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Remove every node with value val from a singly linked list and return its possibly empty head.",
    "examples": "[4,2,4,3], val=4 becomes [2,3].",
    "solution": "A dummy node handles leading removals. Keep a predecessor fixed while its successor matches; otherwise move it forward.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Consecutive matching nodes require rechecking the same predecessor.",
    "followUp": "How would you adapt this to remove nodes matching a predicate?",
    "sourceUrl": "https://leetcode.com/problems/remove-linked-list-elements/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode removeElements(ListNode h, int val) {\n        ListNode d = new ListNode(0, h),\n            p = d;\n        while (p.next != null) {\n            if (p.next.val == val) p.next = p.next.next;\n            else p = p.next;\n        }\n        return d.next;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Linked List Elements: what invariant makes the approach work?",
        "back": "A dummy node handles leading removals. Keep a predecessor fixed while its successor matches; otherwise move it forward."
      },
      {
        "type": "Complexity",
        "front": "Remove Linked List Elements: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Remove Linked List Elements: what implementation trap should you check before submitting?",
        "back": "Consecutive matching nodes require rechecking the same predecessor."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove Linked List Elements: trace the algorithm on a small example, including its intermediate state.",
        "back": "[4,2,4,3], val=4 becomes [2,3].\n\nA dummy node handles leading removals. Keep a predecessor fixed while its successor matches; otherwise move it forward."
      }
    ],
    "testCode": "if (!(new Solution().removeElements(new ListNode(4,new ListNode(4)),4)==null)) throw new AssertionError(\"LC 203 failed\");\nif (!(new Solution().removeElements(new ListNode(2),4).val==2)) throw new AssertionError(\"LC 203 failed\");"
  },
  {
    "id": "lc-206",
    "number": 206,
    "title": "Reverse Linked List",
    "slug": "reverse-linked-list",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Reverse the next pointers of a singly linked list and return the new head. Empty input returns null.",
    "examples": "[3,6,9] becomes [9,6,3].",
    "solution": "Maintain a reversed prefix and an untouched suffix. Save the suffix successor, point current to the prefix, then advance both boundaries.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Overwriting next before saving it loses the unprocessed suffix.",
    "followUp": "Write a recursive version and account for its O(n) call stack.",
    "sourceUrl": "https://leetcode.com/problems/reverse-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode reverseList(ListNode h) {\n        ListNode p = null;\n        while (h != null) {\n            ListNode n = h.next;\n            h.next = p;\n            p = h;\n            h = n;\n        }\n        return p;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reverse Linked List: what invariant makes the approach work?",
        "back": "Maintain a reversed prefix and an untouched suffix. Save the suffix successor, point current to the prefix, then advance both boundaries."
      },
      {
        "type": "Complexity",
        "front": "Reverse Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Reverse Linked List: what implementation trap should you check before submitting?",
        "back": "Overwriting next before saving it loses the unprocessed suffix."
      },
      {
        "type": "Algorithm steps",
        "front": "Reverse Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[3,6,9] becomes [9,6,3].\n\nMaintain a reversed prefix and an untouched suffix. Save the suffix successor, point current to the prefix, then advance both boundaries."
      }
    ],
    "testCode": "if (!(new Solution().reverseList(null)==null)) throw new AssertionError(\"LC 206 failed\");\nif (!(new Solution().reverseList(new ListNode(3,new ListNode(6))).val==6)) throw new AssertionError(\"LC 206 failed\");"
  },
  {
    "id": "lc-234",
    "number": 234,
    "title": "Palindrome Linked List",
    "slug": "palindrome-linked-list",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Check whether a list’s value sequence reads the same in both directions. The solution restores the original links before returning.",
    "examples": "[2,5,2] is a palindrome; [2,5] is not.",
    "solution": "Find the midpoint, reverse the second half, compare corresponding values, and reverse it again to restore input.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Restore links even if a mismatch is found.",
    "followUp": "Explain why comparing only the second-half length works for odd lists.",
    "sourceUrl": "https://leetcode.com/problems/palindrome-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    ListNode rev(ListNode h) {\n        ListNode p = null;\n        while (h != null) {\n            ListNode n = h.next;\n            h.next = p;\n            p = h;\n            h = n;\n        }\n        return p;\n    }\n\n    public boolean isPalindrome(ListNode h) {\n        if (h == null) return true;\n        ListNode s = h,\n            f = h;\n        while (f.next != null && f.next.next != null) {\n            s = s.next;\n            f = f.next.next;\n        }\n        ListNode b = rev(s.next),\n            q = b,\n            p = h;\n        boolean ok = true;\n        while (q != null) {\n            if (p.val != q.val) ok = false;\n            p = p.next;\n            q = q.next;\n        }\n        s.next = rev(b);\n        return ok;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Palindrome Linked List: what invariant makes the approach work?",
        "back": "Find the midpoint, reverse the second half, compare corresponding values, and reverse it again to restore input."
      },
      {
        "type": "Complexity",
        "front": "Palindrome Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Palindrome Linked List: what implementation trap should you check before submitting?",
        "back": "Restore links even if a mismatch is found."
      },
      {
        "type": "Algorithm steps",
        "front": "Palindrome Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,5,2] is a palindrome; [2,5] is not.\n\nFind the midpoint, reverse the second half, compare corresponding values, and reverse it again to restore input."
      }
    ],
    "testCode": "if (!(new Solution().isPalindrome(new ListNode(2,new ListNode(5,new ListNode(2)))))) throw new AssertionError(\"LC 234 failed\");\nif (!(!new Solution().isPalindrome(new ListNode(2,new ListNode(5))))) throw new AssertionError(\"LC 234 failed\");\nListNode a=new ListNode(1,new ListNode(2,new ListNode(1)));ListNode b=a.next,c=b.next;if(!new Solution().isPalindrome(a)||a.next!=b||b.next!=c||c.next!=null)throw new AssertionError(\"restore\");"
  },
  {
    "id": "lc-237",
    "number": 237,
    "title": "Delete Node in a Linked List",
    "slug": "delete-node-in-a-linked-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "You receive only a non-tail node in a list with unique values. Remove its value from the list without access to the head.",
    "examples": "Given the node holding 4 in 1→4→7, copy 7 into that node and bypass the old 7 node.",
    "solution": "Copy the successor’s value into the given node and bypass the successor. This simulates deleting the supplied position because a successor is guaranteed.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "pitfall": "This technique cannot delete a tail and changes node contents.",
    "followUp": "Explain why the operation is impossible for a tail with only this reference.",
    "sourceUrl": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void deleteNode(ListNode node) {\n        node.val = node.next.val;\n        node.next = node.next.next;\n    }\n\n    public boolean check(int a, int b) {\n        ListNode n = new ListNode(a, new ListNode(b));\n        deleteNode(n);\n        return n.val == b && n.next == null;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Delete Node in a Linked List: what invariant makes the approach work?",
        "back": "Copy the successor’s value into the given node and bypass the successor. This simulates deleting the supplied position because a successor is guaranteed."
      },
      {
        "type": "Complexity",
        "front": "Delete Node in a Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(1). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Delete Node in a Linked List: what implementation trap should you check before submitting?",
        "back": "This technique cannot delete a tail and changes node contents."
      },
      {
        "type": "Algorithm steps",
        "front": "Delete Node in a Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "Given the node holding 4 in 1→4→7, copy 7 into that node and bypass the old 7 node.\n\nCopy the successor’s value into the given node and bypass the successor. This simulates deleting the supplied position because a successor is guaranteed."
      }
    ],
    "testCode": "if (!(new Solution().check(4,7))) throw new AssertionError(\"LC 237 failed\");\nif (!(new Solution().check(-1,0))) throw new AssertionError(\"LC 237 failed\");"
  },
  {
    "id": "lc-328",
    "number": 328,
    "title": "Odd Even Linked List",
    "slug": "odd-even-linked-list",
    "difficulty": "Medium",
    "tags": "Linked list",
    "context": "Group nodes at odd one-based positions before nodes at even positions, preserving order inside each group. Positions, not values, determine membership.",
    "examples": "[8,3,6,1,9] becomes [8,6,9,3,1].",
    "solution": "Maintain odd and even tails and save the first even node. Skip alternately to extend both chains, then append the even chain after the odd tail.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Do not partition by odd/even numeric values.",
    "followUp": "Trace lists of lengths two, three, and four to validate termination.",
    "sourceUrl": "https://leetcode.com/problems/odd-even-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode oddEvenList(ListNode h) {\n        if (h == null) return null;\n        ListNode o = h,\n            e = h.next,\n            start = e;\n        while (e != null && e.next != null) {\n            o.next = e.next;\n            o = o.next;\n            e.next = o.next;\n            e = e.next;\n        }\n        o.next = start;\n        return h;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Odd Even Linked List: what invariant makes the approach work?",
        "back": "Maintain odd and even tails and save the first even node. Skip alternately to extend both chains, then append the even chain after the odd tail."
      },
      {
        "type": "Complexity",
        "front": "Odd Even Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Odd Even Linked List: what implementation trap should you check before submitting?",
        "back": "Do not partition by odd/even numeric values."
      },
      {
        "type": "Algorithm steps",
        "front": "Odd Even Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[8,3,6,1,9] becomes [8,6,9,3,1].\n\nMaintain odd and even tails and save the first even node. Skip alternately to extend both chains, then append the even chain after the odd tail."
      }
    ],
    "testCode": "if (!(new Solution().oddEvenList(null)==null)) throw new AssertionError(\"LC 328 failed\");\nif (!(new Solution().oddEvenList(new ListNode(8,new ListNode(3,new ListNode(6)))).next.val==6)) throw new AssertionError(\"LC 328 failed\");"
  },
  {
    "id": "lc-445",
    "number": 445,
    "title": "Add Two Numbers II",
    "slug": "add-two-numbers-ii",
    "difficulty": "Medium",
    "tags": "Linked list, Stack",
    "context": "Two nonempty lists represent decimal integers most-significant digit first. Return their sum in the same order without modifying inputs.",
    "examples": "[2,8] + [7] yields [3,5].",
    "solution": "Push each number’s digits onto a stack, add from the least-significant end with carry, and prepend every computed result digit.",
    "timeComplexity": "O(m+n)",
    "spaceComplexity": "O(m+n)",
    "pitfall": "A final carry must become a new leading node.",
    "followUp": "Can you solve it by reversing inputs and still restore them afterward?",
    "sourceUrl": "https://leetcode.com/problems/add-two-numbers-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode addTwoNumbers(ListNode a, ListNode b) {\n        Deque<Integer> x = new ArrayDeque<>(),\n            y = new ArrayDeque<>();\n        for (; a != null; a = a.next) x.push(a.val);\n        for (; b != null; b = b.next) y.push(b.val);\n        ListNode h = null;\n        int c = 0;\n        while (!x.isEmpty() || !y.isEmpty() || c != 0) {\n            if (!x.isEmpty()) c += x.pop();\n            if (!y.isEmpty()) c += y.pop();\n            h = new ListNode(c % 10, h);\n            c /= 10;\n        }\n        return h;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Add Two Numbers II: what invariant makes the approach work?",
        "back": "Push each number’s digits onto a stack, add from the least-significant end with carry, and prepend every computed result digit."
      },
      {
        "type": "Complexity",
        "front": "Add Two Numbers II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(m+n). Auxiliary space: O(m+n)."
      },
      {
        "type": "Edge case",
        "front": "Add Two Numbers II: what implementation trap should you check before submitting?",
        "back": "A final carry must become a new leading node."
      },
      {
        "type": "Algorithm steps",
        "front": "Add Two Numbers II: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,8] + [7] yields [3,5].\n\nPush each number’s digits onto a stack, add from the least-significant end with carry, and prepend every computed result digit."
      }
    ],
    "testCode": "if (!(new Solution().addTwoNumbers(new ListNode(9),new ListNode(1)).val==1)) throw new AssertionError(\"LC 445 failed\");\nif (!(new Solution().addTwoNumbers(new ListNode(0),new ListNode(0)).val==0)) throw new AssertionError(\"LC 445 failed\");"
  },
  {
    "id": "lc-876",
    "number": 876,
    "title": "Middle of the Linked List",
    "slug": "middle-of-the-linked-list",
    "difficulty": "Easy",
    "tags": "Linked list",
    "context": "Return the middle node of a nonempty singly linked list. For an even number of nodes, return the second middle.",
    "examples": "[1,2,3,4] returns the node holding 3.",
    "solution": "Advance slow one node and fast two. When fast cannot continue, slow has advanced floor(n/2) positions to the requested middle.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "A different loop condition can select the first middle instead.",
    "followUp": "Modify the loop to return the first middle for even lengths.",
    "sourceUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public ListNode middleNode(ListNode h) {\n        ListNode s = h,\n            f = h;\n        while (f != null && f.next != null) {\n            s = s.next;\n            f = f.next.next;\n        }\n        return s;\n    }\n}\n\nclass ListNode {\n\n    int val;\n    ListNode next;\n\n    ListNode(int v) {\n        val = v;\n    }\n\n    ListNode(int v, ListNode n) {\n        val = v;\n        next = n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Middle of the Linked List: what invariant makes the approach work?",
        "back": "Advance slow one node and fast two. When fast cannot continue, slow has advanced floor(n/2) positions to the requested middle."
      },
      {
        "type": "Complexity",
        "front": "Middle of the Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Middle of the Linked List: what implementation trap should you check before submitting?",
        "back": "A different loop condition can select the first middle instead."
      },
      {
        "type": "Algorithm steps",
        "front": "Middle of the Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,2,3,4] returns the node holding 3.\n\nAdvance slow one node and fast two. When fast cannot continue, slow has advanced floor(n/2) positions to the requested middle."
      }
    ],
    "testCode": "if (!(new Solution().middleNode(new ListNode(1)).val==1)) throw new AssertionError(\"LC 876 failed\");\nif (!(new Solution().middleNode(new ListNode(1,new ListNode(2))).val==2)) throw new AssertionError(\"LC 876 failed\");"
  },
  {
    "id": "lc-138",
    "number": 138,
    "title": "Copy List with Random Pointer",
    "slug": "copy-list-with-random-pointer",
    "difficulty": "Medium",
    "tags": "Linked list, Hash map",
    "context": "Deep-copy a list whose nodes have next and random pointers. Each random pointer is null or points to a node in the same list; copies must not share original nodes.",
    "examples": "For A.next=B and A.random=B, copied A points to copied B through both links.",
    "solution": "First map every original node to a new node. In a second pass translate next and random through that map, so forward and backward random edges both resolve.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Copy random targets by identity, never by value, because values can repeat.",
    "followUp": "Derive the interleaving-copy technique using O(1) auxiliary space.",
    "sourceUrl": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public Node copyRandomList(Node head) {\n        Map<Node, Node> m = new IdentityHashMap<>();\n        for (Node p = head; p != null; p = p.next) m.put(p, new Node(p.val));\n        for (Node p = head; p != null; p = p.next) {\n            m.get(p).next = m.get(p.next);\n            m.get(p).random = m.get(p.random);\n        }\n        return m.get(head);\n    }\n\n    public boolean check() {\n        Node a = new Node(1);\n        a.random = a;\n        Node b = copyRandomList(a);\n        return b != a && b.random == b && b.val == 1;\n    }\n}\n\nclass Node {\n\n    int val;\n    Node next, random;\n\n    Node(int v) {\n        val = v;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Copy List with Random Pointer: what invariant makes the approach work?",
        "back": "First map every original node to a new node. In a second pass translate next and random through that map, so forward and backward random edges both resolve."
      },
      {
        "type": "Complexity",
        "front": "Copy List with Random Pointer: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Copy List with Random Pointer: what implementation trap should you check before submitting?",
        "back": "Copy random targets by identity, never by value, because values can repeat."
      },
      {
        "type": "Algorithm steps",
        "front": "Copy List with Random Pointer: trace the algorithm on a small example, including its intermediate state.",
        "back": "For A.next=B and A.random=B, copied A points to copied B through both links.\n\nFirst map every original node to a new node. In a second pass translate next and random through that map, so forward and backward random edges both resolve."
      }
    ],
    "testCode": "if (!(new Solution().copyRandomList(null)==null)) throw new AssertionError(\"LC 138 failed\");\nif (!(new Solution().check())) throw new AssertionError(\"LC 138 failed\");"
  },
  {
    "id": "lc-430",
    "number": 430,
    "title": "Flatten a Multilevel Doubly Linked List",
    "slug": "flatten-a-multilevel-doubly-linked-list",
    "difficulty": "Medium",
    "tags": "Linked list, Stack",
    "context": "Flatten a doubly linked structure with child lists into depth-first order. Insert each child chain before the original next chain; clear child pointers and maintain prev links.",
    "examples": "1→2 with 1.child=3 flattens to 1→3→2.",
    "solution": "Push next before child on a stack so child is processed first. Append popped nodes to one chain, repairing both directions and clearing child.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "The returned head must have prev=null and all child links must be null.",
    "followUp": "Can you splice recursively and return each flattened subtree’s tail?",
    "sourceUrl": "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public Node flatten(Node head) {\n        if (head == null) return null;\n        Deque<Node> s = new ArrayDeque<>();\n        s.push(head);\n        Node prev = null;\n        while (!s.isEmpty()) {\n            Node n = s.pop();\n            if (n.next != null) s.push(n.next);\n            if (n.child != null) s.push(n.child);\n            n.prev = prev;\n            if (prev != null) prev.next = n;\n            n.child = null;\n            prev = n;\n        }\n        prev.next = null;\n        return head;\n    }\n\n    public boolean check() {\n        Node a = new Node(1),\n            b = new Node(2),\n            c = new Node(3);\n        a.next = b;\n        b.prev = a;\n        a.child = c;\n        flatten(a);\n        return a.next == c && c.next == b && b.prev == c && a.child == null;\n    }\n}\n\nclass Node {\n\n    int val;\n    Node next, prev, child;\n\n    Node(int v) {\n        val = v;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Flatten a Multilevel Doubly Linked List: what invariant makes the approach work?",
        "back": "Push next before child on a stack so child is processed first. Append popped nodes to one chain, repairing both directions and clearing child."
      },
      {
        "type": "Complexity",
        "front": "Flatten a Multilevel Doubly Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Flatten a Multilevel Doubly Linked List: what implementation trap should you check before submitting?",
        "back": "The returned head must have prev=null and all child links must be null."
      },
      {
        "type": "Algorithm steps",
        "front": "Flatten a Multilevel Doubly Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "1→2 with 1.child=3 flattens to 1→3→2.\n\nPush next before child on a stack so child is processed first. Append popped nodes to one chain, repairing both directions and clearing child."
      }
    ],
    "testCode": "if (!(new Solution().flatten(null)==null)) throw new AssertionError(\"LC 430 failed\");\nif (!(new Solution().check())) throw new AssertionError(\"LC 430 failed\");"
  },
  {
    "id": "lc-707",
    "number": 707,
    "title": "Design Linked List",
    "slug": "design-linked-list",
    "difficulty": "Medium",
    "tags": "Linked list, Design",
    "context": "Implement indexed get, insertion at head/tail/index, and deletion. Invalid get returns -1; insertion past size and deletion outside the list do nothing; a negative insertion index acts as zero.",
    "examples": "addAtHead(4), addAtTail(7), addAtIndex(1,5) gives [4,5,7].",
    "solution": "Maintain a dummy predecessor and size. Traverse to the predecessor for edits; uniform link updates handle the head without a separate case.",
    "timeComplexity": "O(n) indexed operations and tail insertion; O(1) head insertion",
    "spaceComplexity": "O(n) stored nodes",
    "pitfall": "Allow insertion exactly at size but reject deletion at size.",
    "followUp": "Add a tail pointer and describe which operations become faster.",
    "sourceUrl": "https://leetcode.com/problems/design-linked-list/",
    "code": "import java.util.*;\n\nclass MyLinkedList {\n\n    private static class N {\n\n        int v;\n        N next;\n\n        N(int v) {\n            this.v = v;\n        }\n    }\n\n    private N d = new N(0);\n    private int size;\n\n    public MyLinkedList() {}\n\n    public int get(int i) {\n        if (i < 0 || i >= size) return -1;\n        N p = d.next;\n        while (i-- > 0) p = p.next;\n        return p.v;\n    }\n\n    public void addAtHead(int v) {\n        addAtIndex(0, v);\n    }\n\n    public void addAtTail(int v) {\n        addAtIndex(size, v);\n    }\n\n    public void addAtIndex(int i, int v) {\n        if (i > size) return;\n        i = Math.max(0, i);\n        N p = d;\n        for (int j = 0; j < i; j++) p = p.next;\n        N n = new N(v);\n        n.next = p.next;\n        p.next = n;\n        size++;\n    }\n\n    public void deleteAtIndex(int i) {\n        if (i < 0 || i >= size) return;\n        N p = d;\n        while (i-- > 0) p = p.next;\n        p.next = p.next.next;\n        size--;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Design Linked List: what invariant makes the approach work?",
        "back": "Maintain a dummy predecessor and size. Traverse to the predecessor for edits; uniform link updates handle the head without a separate case."
      },
      {
        "type": "Complexity",
        "front": "Design Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n) indexed operations and tail insertion; O(1) head insertion. Auxiliary space: O(n) stored nodes."
      },
      {
        "type": "Edge case",
        "front": "Design Linked List: what implementation trap should you check before submitting?",
        "back": "Allow insertion exactly at size but reject deletion at size."
      },
      {
        "type": "Algorithm steps",
        "front": "Design Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "addAtHead(4), addAtTail(7), addAtIndex(1,5) gives [4,5,7].\n\nMaintain a dummy predecessor and size. Traverse to the predecessor for edits; uniform link updates handle the head without a separate case."
      }
    ],
    "testCode": "if (!(new MyLinkedList().get(0)==-1)) throw new AssertionError(\"LC 707 failed\");\nif (!(new MyLinkedList().get(-1)==-1)) throw new AssertionError(\"LC 707 failed\");\nMyLinkedList q=new MyLinkedList();q.addAtHead(4);q.addAtTail(7);q.addAtIndex(1,5);if(q.get(1)!=5)throw new AssertionError(\"insert\");q.deleteAtIndex(1);if(q.get(1)!=7)throw new AssertionError(\"delete\");q.addAtIndex(9,8);if(q.get(2)!=-1)throw new AssertionError(\"bounds\");"
  },
  {
    "id": "lc-20",
    "number": 20,
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "difficulty": "Easy",
    "tags": "Stack",
    "context": "A string contains only round, square, and curly brackets. Decide whether every closer matches the most recent unmatched opener and no opener remains.",
    "examples": "\"{[]}\" is valid; \"[(])\" is invalid.",
    "solution": "Push the expected closing bracket for each opener. A closing bracket must equal the stack top; an empty stack at the end proves complete matching.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Matching counts are insufficient when nesting order is wrong.",
    "followUp": "Explain the difference between balanced counts and valid nesting.",
    "sourceUrl": "https://leetcode.com/problems/valid-parentheses/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isValid(String s) {\n        Deque<Character> q = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') q.push(')');\n            else if (c == '[') q.push(']');\n            else if (c == '{') q.push('}');\n            else if (q.isEmpty() || q.pop() != c) return false;\n        }\n        return q.isEmpty();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Valid Parentheses: what invariant makes the approach work?",
        "back": "Push the expected closing bracket for each opener. A closing bracket must equal the stack top; an empty stack at the end proves complete matching."
      },
      {
        "type": "Complexity",
        "front": "Valid Parentheses: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Valid Parentheses: what implementation trap should you check before submitting?",
        "back": "Matching counts are insufficient when nesting order is wrong."
      },
      {
        "type": "Algorithm steps",
        "front": "Valid Parentheses: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"{[]}\" is valid; \"[(])\" is invalid.\n\nPush the expected closing bracket for each opener. A closing bracket must equal the stack top; an empty stack at the end proves complete matching."
      }
    ],
    "testCode": "if (!(new Solution().isValid(\"{[]}\"))) throw new AssertionError(\"LC 20 failed\");\nif (!(!new Solution().isValid(\"[(])\"))) throw new AssertionError(\"LC 20 failed\");"
  },
  {
    "id": "lc-32",
    "number": 32,
    "title": "Longest Valid Parentheses",
    "slug": "longest-valid-parentheses",
    "difficulty": "Hard",
    "tags": "Stack",
    "context": "Given a string of round parentheses, return the length of its longest contiguous well-formed substring.",
    "examples": "\"())(())\" has longest valid segment \"(())\", length 4.",
    "solution": "Keep unmatched opening indices and a base invalid boundary. After popping for a closer, distance to the remaining top gives the valid suffix length; reset the boundary after an unmatched closer.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Initialize the stack with -1 so a valid prefix has the correct length.",
    "followUp": "Derive a two-pass counter solution with O(1) extra space.",
    "sourceUrl": "https://leetcode.com/problems/longest-valid-parentheses/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int longestValidParentheses(String s) {\n        Deque<Integer> q = new ArrayDeque<>();\n        q.push(-1);\n        int best = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (s.charAt(i) == '(') q.push(i);\n            else {\n                q.pop();\n                if (q.isEmpty()) q.push(i);\n                else best = Math.max(best, i - q.peek());\n            }\n        }\n        return best;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Valid Parentheses: what invariant makes the approach work?",
        "back": "Keep unmatched opening indices and a base invalid boundary. After popping for a closer, distance to the remaining top gives the valid suffix length; reset the boundary after an unmatched closer."
      },
      {
        "type": "Complexity",
        "front": "Longest Valid Parentheses: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Longest Valid Parentheses: what implementation trap should you check before submitting?",
        "back": "Initialize the stack with -1 so a valid prefix has the correct length."
      },
      {
        "type": "Algorithm steps",
        "front": "Longest Valid Parentheses: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"())(())\" has longest valid segment \"(())\", length 4.\n\nKeep unmatched opening indices and a base invalid boundary. After popping for a closer, distance to the remaining top gives the valid suffix length; reset the boundary after an unmatched closer."
      }
    ],
    "testCode": "if (!(new Solution().longestValidParentheses(\"())(())\")==4)) throw new AssertionError(\"LC 32 failed\");\nif (!(new Solution().longestValidParentheses(\"(((\")==0)) throw new AssertionError(\"LC 32 failed\");"
  },
  {
    "id": "lc-71",
    "number": 71,
    "title": "Simplify Path",
    "slug": "simplify-path",
    "difficulty": "Medium",
    "tags": "Stack",
    "context": "Normalize an absolute Unix-style path. Ignore empty components and single dots; double dots move up one level without going above root; other names are literal.",
    "examples": "\"/a//b/../c/.\" normalizes to \"/a/c\".",
    "solution": "Process slash-separated components using a deque of directory names. Each double dot removes the last directory when available; join survivors with one slash.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Three dots are an ordinary directory name, not a parent directive.",
    "followUp": "How would relative paths change treatment of leading double dots?",
    "sourceUrl": "https://leetcode.com/problems/simplify-path/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String simplifyPath(String path) {\n        Deque<String> q = new ArrayDeque<>();\n        for (String p : path.split(\"/\")) {\n            if (p.equals(\"\") || p.equals(\".\")) continue;\n            if (p.equals(\"..\")) {\n                if (!q.isEmpty()) q.removeLast();\n            } else q.addLast(p);\n        }\n        return \"/\" + String.join(\"/\", q);\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Simplify Path: what invariant makes the approach work?",
        "back": "Process slash-separated components using a deque of directory names. Each double dot removes the last directory when available; join survivors with one slash."
      },
      {
        "type": "Complexity",
        "front": "Simplify Path: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Simplify Path: what implementation trap should you check before submitting?",
        "back": "Three dots are an ordinary directory name, not a parent directive."
      },
      {
        "type": "Algorithm steps",
        "front": "Simplify Path: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"/a//b/../c/.\" normalizes to \"/a/c\".\n\nProcess slash-separated components using a deque of directory names. Each double dot removes the last directory when available; join survivors with one slash."
      }
    ],
    "testCode": "if (!(new Solution().simplifyPath(\"/a//b/../c/.\").equals(\"/a/c\"))) throw new AssertionError(\"LC 71 failed\");\nif (!(new Solution().simplifyPath(\"/../../\").equals(\"/\"))) throw new AssertionError(\"LC 71 failed\");"
  },
  {
    "id": "lc-84",
    "number": 84,
    "title": "Largest Rectangle in Histogram",
    "slug": "largest-rectangle-in-histogram",
    "difficulty": "Hard",
    "tags": "Stack, Monotonic stack",
    "context": "Unit-width bars have nonnegative heights. Find the maximum area of a rectangle lying entirely below adjacent bars.",
    "examples": "[3,1,3] has best area 3, from either a height-3 bar or all three height-1 bars.",
    "solution": "Maintain increasing-height indices. On a lower height, pop bars: the current index is their first smaller right boundary, and the new stack top is their smaller left boundary.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Width is right-left-1; flush remaining bars with a zero-height sentinel.",
    "followUp": "Explain why each index is pushed and popped at most once.",
    "sourceUrl": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int largestRectangleArea(int[] h) {\n        Deque<Integer> s = new ArrayDeque<>();\n        int best = 0;\n        for (int i = 0; i <= h.length; i++) {\n            int cur = i == h.length ? 0 : h[i];\n            while (!s.isEmpty() && h[s.peek()] > cur) {\n                int a = h[s.pop()],\n                    left = s.isEmpty() ? -1 : s.peek();\n                best = Math.max(best, a * (i - left - 1));\n            }\n            s.push(i);\n        }\n        return best;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Largest Rectangle in Histogram: what invariant makes the approach work?",
        "back": "Maintain increasing-height indices. On a lower height, pop bars: the current index is their first smaller right boundary, and the new stack top is their smaller left boundary."
      },
      {
        "type": "Complexity",
        "front": "Largest Rectangle in Histogram: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Largest Rectangle in Histogram: what implementation trap should you check before submitting?",
        "back": "Width is right-left-1; flush remaining bars with a zero-height sentinel."
      },
      {
        "type": "Algorithm steps",
        "front": "Largest Rectangle in Histogram: trace the algorithm on a small example, including its intermediate state.",
        "back": "[3,1,3] has best area 3, from either a height-3 bar or all three height-1 bars.\n\nMaintain increasing-height indices. On a lower height, pop bars: the current index is their first smaller right boundary, and the new stack top is their smaller left boundary."
      }
    ],
    "testCode": "if (!(new Solution().largestRectangleArea(new int[]{3,1,3})==3)) throw new AssertionError(\"LC 84 failed\");\nif (!(new Solution().largestRectangleArea(new int[]{2,2})==4)) throw new AssertionError(\"LC 84 failed\");"
  },
  {
    "id": "lc-85",
    "number": 85,
    "title": "Maximal Rectangle",
    "slug": "maximal-rectangle",
    "difficulty": "Hard",
    "tags": "Stack, Matrix",
    "context": "Given a rectangular binary character matrix, return the largest all-one rectangle area. An empty matrix has area zero.",
    "examples": "Rows \"11\",\"10\" have largest all-one rectangle area 2.",
    "solution": "Treat each row as the base of a histogram of consecutive ones above it. Solve the histogram maximum with a monotonic stack for every row.",
    "timeComplexity": "O(rows × columns)",
    "spaceComplexity": "O(columns)",
    "pitfall": "Reset a column height to zero when the current cell is zero.",
    "followUp": "Explain why every all-one rectangle appears in the histogram at its bottom row.",
    "sourceUrl": "https://leetcode.com/problems/maximal-rectangle/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maximalRectangle(char[][] m) {\n        if (m.length == 0) return 0;\n        int[] h = new int[m[0].length];\n        int ans = 0;\n        for (char[] row : m) {\n            for (int j = 0; j < h.length; j++) h[j] =\n                row[j] == '1' ? h[j] + 1 : 0;\n            Deque<Integer> s = new ArrayDeque<>();\n            for (int j = 0; j <= h.length; j++) {\n                int v = j == h.length ? 0 : h[j];\n                while (!s.isEmpty() && h[s.peek()] > v) {\n                    int a = h[s.pop()];\n                    ans = Math.max(\n                        ans,\n                        a * (j - (s.isEmpty() ? -1 : s.peek()) - 1)\n                    );\n                }\n                s.push(j);\n            }\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximal Rectangle: what invariant makes the approach work?",
        "back": "Treat each row as the base of a histogram of consecutive ones above it. Solve the histogram maximum with a monotonic stack for every row."
      },
      {
        "type": "Complexity",
        "front": "Maximal Rectangle: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(rows × columns). Auxiliary space: O(columns)."
      },
      {
        "type": "Edge case",
        "front": "Maximal Rectangle: what implementation trap should you check before submitting?",
        "back": "Reset a column height to zero when the current cell is zero."
      },
      {
        "type": "Algorithm steps",
        "front": "Maximal Rectangle: trace the algorithm on a small example, including its intermediate state.",
        "back": "Rows \"11\",\"10\" have largest all-one rectangle area 2.\n\nTreat each row as the base of a histogram of consecutive ones above it. Solve the histogram maximum with a monotonic stack for every row."
      }
    ],
    "testCode": "if (!(new Solution().maximalRectangle(new char[][]{{'1','1'},{'1','0'}})==2)) throw new AssertionError(\"LC 85 failed\");\nif (!(new Solution().maximalRectangle(new char[][]{{'0'}})==0)) throw new AssertionError(\"LC 85 failed\");"
  },
  {
    "id": "lc-150",
    "number": 150,
    "title": "Evaluate Reverse Polish Notation",
    "slug": "evaluate-reverse-polish-notation",
    "difficulty": "Medium",
    "tags": "Stack",
    "context": "Evaluate valid postfix tokens containing integers and +, -, *, /. Integer division truncates toward zero; intermediate results fit a signed int.",
    "examples": "[\"8\",\"3\",\"-\"] evaluates to 5.",
    "solution": "Push operands. For an operator pop right then left, compute left operator right, and push the result; each stack entry is a completed subexpression.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Reversing operand order breaks subtraction and division.",
    "followUp": "Why does postfix evaluation need no precedence rules?",
    "sourceUrl": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int evalRPN(String[] tokens) {\n        Deque<Integer> s = new ArrayDeque<>();\n        for (String t : tokens) {\n            if (\n                t.equals(\"+\") || t.equals(\"-\") || t.equals(\"*\") || t.equals(\"/\")\n            ) {\n                int b = s.pop(),\n                    a = s.pop();\n                s.push(\n                    switch (t) {\n                        case \"+\" -> a + b;\n                        case \"-\" -> a - b;\n                        case \"*\" -> a * b;\n                        default -> a / b;\n                    }\n                );\n            } else s.push(Integer.parseInt(t));\n        }\n        return s.pop();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Evaluate Reverse Polish Notation: what invariant makes the approach work?",
        "back": "Push operands. For an operator pop right then left, compute left operator right, and push the result; each stack entry is a completed subexpression."
      },
      {
        "type": "Complexity",
        "front": "Evaluate Reverse Polish Notation: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Evaluate Reverse Polish Notation: what implementation trap should you check before submitting?",
        "back": "Reversing operand order breaks subtraction and division."
      },
      {
        "type": "Algorithm steps",
        "front": "Evaluate Reverse Polish Notation: trace the algorithm on a small example, including its intermediate state.",
        "back": "[\"8\",\"3\",\"-\"] evaluates to 5.\n\nPush operands. For an operator pop right then left, compute left operator right, and push the result; each stack entry is a completed subexpression."
      }
    ],
    "testCode": "if (!(new Solution().evalRPN(new String[]{\"8\",\"3\",\"-\"})==5)) throw new AssertionError(\"LC 150 failed\");\nif (!(new Solution().evalRPN(new String[]{\"-7\",\"2\",\"/\"})==-3)) throw new AssertionError(\"LC 150 failed\");"
  },
  {
    "id": "lc-155",
    "number": 155,
    "title": "Min Stack",
    "slug": "min-stack",
    "difficulty": "Medium",
    "tags": "Stack, Design",
    "context": "Implement push, pop, top, and getMin in constant time. Queries and removals occur only on a nonempty stack.",
    "examples": "push(4), push(1), push(1), pop() leaves minimum 1.",
    "solution": "Store each value alongside the minimum at its depth. Popping automatically restores the prior minimum, including duplicate minima.",
    "timeComplexity": "O(1) per operation",
    "spaceComplexity": "O(n)",
    "pitfall": "A separate minimum stack must preserve repeated minima.",
    "followUp": "Compare paired entries with a two-stack implementation.",
    "sourceUrl": "https://leetcode.com/problems/min-stack/",
    "code": "import java.util.*;\n\nclass MinStack {\n\n    private Deque<int[]> s = new ArrayDeque<>();\n\n    public MinStack() {}\n\n    public void push(int v) {\n        s.push(new int[] { v, s.isEmpty() ? v : Math.min(v, s.peek()[1]) });\n    }\n\n    public void pop() {\n        s.pop();\n    }\n\n    public int top() {\n        return s.peek()[0];\n    }\n\n    public int getMin() {\n        return s.peek()[1];\n    }\n\n    public static boolean check(int a, int b) {\n        MinStack s = new MinStack();\n        s.push(a);\n        s.push(b);\n        boolean ok = s.getMin() == Math.min(a, b);\n        s.pop();\n        return ok && s.top() == a && s.getMin() == a;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Min Stack: what invariant makes the approach work?",
        "back": "Store each value alongside the minimum at its depth. Popping automatically restores the prior minimum, including duplicate minima."
      },
      {
        "type": "Complexity",
        "front": "Min Stack: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(1) per operation. Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Min Stack: what implementation trap should you check before submitting?",
        "back": "A separate minimum stack must preserve repeated minima."
      },
      {
        "type": "Algorithm steps",
        "front": "Min Stack: trace the algorithm on a small example, including its intermediate state.",
        "back": "push(4), push(1), push(1), pop() leaves minimum 1.\n\nStore each value alongside the minimum at its depth. Popping automatically restores the prior minimum, including duplicate minima."
      }
    ],
    "testCode": "if (!(MinStack.check(4,1))) throw new AssertionError(\"LC 155 failed\");\nif (!(MinStack.check(1,1))) throw new AssertionError(\"LC 155 failed\");"
  },
  {
    "id": "lc-224",
    "number": 224,
    "title": "Basic Calculator",
    "slug": "basic-calculator",
    "difficulty": "Hard",
    "tags": "Stack, Parsing",
    "context": "Evaluate a valid expression containing integers, spaces, +, -, and parentheses, including unary minus. No multiplication or division is present.",
    "examples": "\"7-(2+3)\" evaluates to 2; \"-(4-6)\" evaluates to 2.",
    "solution": "Accumulate the current result and sign. On opening parentheses save the outer result and sign; on closing, combine the inner result into that saved frame.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Unary minus before a parenthesized group must apply to the entire group.",
    "followUp": "Extend the parser to multiplication while preserving operator precedence.",
    "sourceUrl": "https://leetcode.com/problems/basic-calculator/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int calculate(String s) {\n        Deque<Integer> st = new ArrayDeque<>();\n        int res = 0,\n            num = 0,\n            sign = 1;\n        for (char c : s.toCharArray()) {\n            if (Character.isDigit(c)) num = num * 10 + c - '0';\n            else if (c == '+' || c == '-') {\n                res += sign * num;\n                num = 0;\n                sign = c == '+' ? 1 : -1;\n            } else if (c == '(') {\n                st.push(res);\n                st.push(sign);\n                res = 0;\n                sign = 1;\n            } else if (c == ')') {\n                res += sign * num;\n                num = 0;\n                res = st.pop() * res + st.pop();\n            }\n        }\n        return res + sign * num;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Basic Calculator: what invariant makes the approach work?",
        "back": "Accumulate the current result and sign. On opening parentheses save the outer result and sign; on closing, combine the inner result into that saved frame."
      },
      {
        "type": "Complexity",
        "front": "Basic Calculator: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Basic Calculator: what implementation trap should you check before submitting?",
        "back": "Unary minus before a parenthesized group must apply to the entire group."
      },
      {
        "type": "Algorithm steps",
        "front": "Basic Calculator: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"7-(2+3)\" evaluates to 2; \"-(4-6)\" evaluates to 2.\n\nAccumulate the current result and sign. On opening parentheses save the outer result and sign; on closing, combine the inner result into that saved frame."
      }
    ],
    "testCode": "if (!(new Solution().calculate(\"7-(2+3)\")==2)) throw new AssertionError(\"LC 224 failed\");\nif (!(new Solution().calculate(\"-(4-6)\")==2)) throw new AssertionError(\"LC 224 failed\");"
  },
  {
    "id": "lc-225",
    "number": 225,
    "title": "Implement Stack using Queues",
    "slug": "implement-stack-using-queues",
    "difficulty": "Easy",
    "tags": "Queue, Design",
    "context": "Implement a LIFO stack using queue operations only. top and pop are called only when nonempty.",
    "examples": "push(2), push(5), pop() returns 5.",
    "solution": "On push, append the new value then rotate all older values behind it. The queue front is therefore always the newest stack element.",
    "timeComplexity": "O(n) push; O(1) pop/top/empty",
    "spaceComplexity": "O(n)",
    "pitfall": "Rotate exactly the old queue size, not a changing loop bound.",
    "followUp": "Trade costly push for costly pop and compare workload assumptions.",
    "sourceUrl": "https://leetcode.com/problems/implement-stack-using-queues/",
    "code": "import java.util.*;\n\nclass MyStack {\n\n    private Queue<Integer> q = new ArrayDeque<>();\n\n    public MyStack() {}\n\n    public void push(int x) {\n        int n = q.size();\n        q.add(x);\n        while (n-- > 0) q.add(q.remove());\n    }\n\n    public int pop() {\n        return q.remove();\n    }\n\n    public int top() {\n        return q.element();\n    }\n\n    public boolean empty() {\n        return q.isEmpty();\n    }\n\n    public static boolean check() {\n        MyStack s = new MyStack();\n        s.push(2);\n        s.push(5);\n        return s.pop() == 5 && s.top() == 2;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Implement Stack using Queues: what invariant makes the approach work?",
        "back": "On push, append the new value then rotate all older values behind it. The queue front is therefore always the newest stack element."
      },
      {
        "type": "Complexity",
        "front": "Implement Stack using Queues: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n) push; O(1) pop/top/empty. Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Implement Stack using Queues: what implementation trap should you check before submitting?",
        "back": "Rotate exactly the old queue size, not a changing loop bound."
      },
      {
        "type": "Algorithm steps",
        "front": "Implement Stack using Queues: trace the algorithm on a small example, including its intermediate state.",
        "back": "push(2), push(5), pop() returns 5.\n\nOn push, append the new value then rotate all older values behind it. The queue front is therefore always the newest stack element."
      }
    ],
    "testCode": "if (!(new MyStack().empty())) throw new AssertionError(\"LC 225 failed\");\nif (!(MyStack.check())) throw new AssertionError(\"LC 225 failed\");"
  },
  {
    "id": "lc-232",
    "number": 232,
    "title": "Implement Queue using Stacks",
    "slug": "implement-queue-using-stacks",
    "difficulty": "Easy",
    "tags": "Stack, Design",
    "context": "Implement FIFO push, pop, peek, and empty using stack operations. Retrieval occurs only when the queue is nonempty.",
    "examples": "push(2), push(5), pop() returns 2.",
    "solution": "Push new values to an input stack. Transfer all to the output stack only when output is empty, reversing insertion order exactly once per element.",
    "timeComplexity": "Amortized O(1) per operation; O(n) worst-case transfer",
    "spaceComplexity": "O(n)",
    "pitfall": "Transferring while output is nonempty destroys queue order.",
    "followUp": "Use an aggregate argument to prove the amortized bound.",
    "sourceUrl": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "code": "import java.util.*;\n\nclass MyQueue {\n\n    private Deque<Integer> a = new ArrayDeque<>(),\n        b = new ArrayDeque<>();\n\n    public MyQueue() {}\n\n    public void push(int x) {\n        a.push(x);\n    }\n\n    private void move() {\n        if (b.isEmpty()) while (!a.isEmpty()) b.push(a.pop());\n    }\n\n    public int pop() {\n        move();\n        return b.pop();\n    }\n\n    public int peek() {\n        move();\n        return b.peek();\n    }\n\n    public boolean empty() {\n        return a.isEmpty() && b.isEmpty();\n    }\n\n    public static boolean check() {\n        MyQueue q = new MyQueue();\n        q.push(2);\n        q.push(5);\n        return q.pop() == 2 && q.peek() == 5;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Implement Queue using Stacks: what invariant makes the approach work?",
        "back": "Push new values to an input stack. Transfer all to the output stack only when output is empty, reversing insertion order exactly once per element."
      },
      {
        "type": "Complexity",
        "front": "Implement Queue using Stacks: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: Amortized O(1) per operation; O(n) worst-case transfer. Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Implement Queue using Stacks: what implementation trap should you check before submitting?",
        "back": "Transferring while output is nonempty destroys queue order."
      },
      {
        "type": "Algorithm steps",
        "front": "Implement Queue using Stacks: trace the algorithm on a small example, including its intermediate state.",
        "back": "push(2), push(5), pop() returns 2.\n\nPush new values to an input stack. Transfer all to the output stack only when output is empty, reversing insertion order exactly once per element."
      }
    ],
    "testCode": "if (!(new MyQueue().empty())) throw new AssertionError(\"LC 232 failed\");\nif (!(MyQueue.check())) throw new AssertionError(\"LC 232 failed\");"
  },
  {
    "id": "lc-316",
    "number": 316,
    "title": "Remove Duplicate Letters",
    "slug": "remove-duplicate-letters",
    "difficulty": "Medium",
    "tags": "Stack, Greedy",
    "context": "From a lowercase string choose a subsequence containing each distinct letter exactly once that is lexicographically smallest.",
    "examples": "\"bcabc\" yields \"abc\".",
    "solution": "Track remaining counts and chosen letters. Pop a larger stack top only if it appears later, so replacing it improves lexicographic order without losing coverage.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1), alphabet capped at 26",
    "pitfall": "Never pop a letter whose remaining count is zero.",
    "followUp": "Explain why ordinary sorting is invalid because the answer must be a subsequence.",
    "sourceUrl": "https://leetcode.com/problems/remove-duplicate-letters/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String removeDuplicateLetters(String s) {\n        int[] left = new int[26];\n        boolean[] used = new boolean[26];\n        for (char c : s.toCharArray()) left[c - 'a']++;\n        StringBuilder b = new StringBuilder();\n        for (char c : s.toCharArray()) {\n            int i = c - 'a';\n            left[i]--;\n            if (used[i]) continue;\n            while (\n                b.length() > 0 &&\n                b.charAt(b.length() - 1) > c &&\n                left[b.charAt(b.length() - 1) - 'a'] > 0\n            ) {\n                used[b.charAt(b.length() - 1) - 'a'] = false;\n                b.setLength(b.length() - 1);\n            }\n            b.append(c);\n            used[i] = true;\n        }\n        return b.toString();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove Duplicate Letters: what invariant makes the approach work?",
        "back": "Track remaining counts and chosen letters. Pop a larger stack top only if it appears later, so replacing it improves lexicographic order without losing coverage."
      },
      {
        "type": "Complexity",
        "front": "Remove Duplicate Letters: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1), alphabet capped at 26."
      },
      {
        "type": "Edge case",
        "front": "Remove Duplicate Letters: what implementation trap should you check before submitting?",
        "back": "Never pop a letter whose remaining count is zero."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove Duplicate Letters: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"bcabc\" yields \"abc\".\n\nTrack remaining counts and chosen letters. Pop a larger stack top only if it appears later, so replacing it improves lexicographic order without losing coverage."
      }
    ],
    "testCode": "if (!(new Solution().removeDuplicateLetters(\"bcabc\").equals(\"abc\"))) throw new AssertionError(\"LC 316 failed\");\nif (!(new Solution().removeDuplicateLetters(\"aaaa\").equals(\"a\"))) throw new AssertionError(\"LC 316 failed\");"
  },
  {
    "id": "lc-394",
    "number": 394,
    "title": "Decode String",
    "slug": "decode-string",
    "difficulty": "Medium",
    "tags": "Stack, Parsing",
    "context": "Decode valid nested repetition text of the form count[substring]. Counts are positive integers; literal text contains letters and output fits the problem’s limits.",
    "examples": "\"2[a3[b]]\" becomes \"abbbabbb\".",
    "solution": "Use stacks for outer builders and repeat counts. Opening a bracket starts a fresh segment; closing it repeats the finished inner segment into its parent.",
    "timeComplexity": "O(n + total intermediate expanded text), O(n·output length) upper bound",
    "spaceComplexity": "O(n + output length)",
    "pitfall": "Counts may contain multiple digits; reset the count after opening a bracket.",
    "followUp": "Discuss how deeply nested repeats affect copying and output-size complexity.",
    "sourceUrl": "https://leetcode.com/problems/decode-string/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String decodeString(String s) {\n        Deque<Integer> counts = new ArrayDeque<>();\n        Deque<StringBuilder> parents = new ArrayDeque<>();\n        StringBuilder b = new StringBuilder();\n        int n = 0;\n        for (char c : s.toCharArray()) {\n            if (Character.isDigit(c)) n = n * 10 + c - '0';\n            else if (c == '[') {\n                counts.push(n);\n                parents.push(b);\n                n = 0;\n                b = new StringBuilder();\n            } else if (c == ']') {\n                String part = b.toString();\n                b = parents.pop();\n                int k = counts.pop();\n                while (k-- > 0) b.append(part);\n            } else b.append(c);\n        }\n        return b.toString();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Decode String: what invariant makes the approach work?",
        "back": "Use stacks for outer builders and repeat counts. Opening a bracket starts a fresh segment; closing it repeats the finished inner segment into its parent."
      },
      {
        "type": "Complexity",
        "front": "Decode String: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n + total intermediate expanded text), O(n·output length) upper bound. Auxiliary space: O(n + output length)."
      },
      {
        "type": "Edge case",
        "front": "Decode String: what implementation trap should you check before submitting?",
        "back": "Counts may contain multiple digits; reset the count after opening a bracket."
      },
      {
        "type": "Algorithm steps",
        "front": "Decode String: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"2[a3[b]]\" becomes \"abbbabbb\".\n\nUse stacks for outer builders and repeat counts. Opening a bracket starts a fresh segment; closing it repeats the finished inner segment into its parent."
      }
    ],
    "testCode": "if (!(new Solution().decodeString(\"2[a3[b]]\").equals(\"abbbabbb\"))) throw new AssertionError(\"LC 394 failed\");\nif (!(new Solution().decodeString(\"10[x]\").length()==10)) throw new AssertionError(\"LC 394 failed\");"
  },
  {
    "id": "lc-402",
    "number": 402,
    "title": "Remove K Digits",
    "slug": "remove-k-digits",
    "difficulty": "Medium",
    "tags": "Stack, Greedy",
    "context": "Remove exactly k digits from a decimal nonnegative integer string to minimize its numeric value. Return normalized output without leading zeros, or \"0\".",
    "examples": "\"4321\", k=2 yields \"21\".",
    "solution": "Maintain nondecreasing chosen digits, deleting larger previous digits when a smaller one arrives and budget remains. Delete any remaining budget from the end.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "A monotone increasing input still requires trailing deletions.",
    "followUp": "Prove why deleting the first decreasing pair is locally safe.",
    "sourceUrl": "https://leetcode.com/problems/remove-k-digits/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String removeKdigits(String num, int k) {\n        StringBuilder b = new StringBuilder();\n        for (char c : num.toCharArray()) {\n            while (k > 0 && b.length() > 0 && b.charAt(b.length() - 1) > c) {\n                b.setLength(b.length() - 1);\n                k--;\n            }\n            b.append(c);\n        }\n        b.setLength(b.length() - k);\n        int i = 0;\n        while (i < b.length() && b.charAt(i) == '0') i++;\n        return i == b.length() ? \"0\" : b.substring(i);\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove K Digits: what invariant makes the approach work?",
        "back": "Maintain nondecreasing chosen digits, deleting larger previous digits when a smaller one arrives and budget remains. Delete any remaining budget from the end."
      },
      {
        "type": "Complexity",
        "front": "Remove K Digits: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Remove K Digits: what implementation trap should you check before submitting?",
        "back": "A monotone increasing input still requires trailing deletions."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove K Digits: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"4321\", k=2 yields \"21\".\n\nMaintain nondecreasing chosen digits, deleting larger previous digits when a smaller one arrives and budget remains. Delete any remaining budget from the end."
      }
    ],
    "testCode": "if (!(new Solution().removeKdigits(\"4321\",2).equals(\"21\"))) throw new AssertionError(\"LC 402 failed\");\nif (!(new Solution().removeKdigits(\"10\",2).equals(\"0\"))) throw new AssertionError(\"LC 402 failed\");"
  },
  {
    "id": "lc-496",
    "number": 496,
    "title": "Next Greater Element I",
    "slug": "next-greater-element-i",
    "difficulty": "Easy",
    "tags": "Stack, Monotonic stack",
    "context": "For each distinct value in nums1, a subset of distinct nums2, return the first greater value to its right in nums2 or -1.",
    "examples": "nums1=[2,1], nums2=[2,3,1] yields [3,-1].",
    "solution": "Scan nums2 with a decreasing stack of unresolved values. A larger current value resolves every smaller top; record answers in a map for subset lookup.",
    "timeComplexity": "O(n+m)",
    "spaceComplexity": "O(n)",
    "pitfall": "Return the first greater value, not the maximum of the suffix.",
    "followUp": "How must the data structure change if duplicate values are allowed?",
    "sourceUrl": "https://leetcode.com/problems/next-greater-element-i/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] nextGreaterElement(int[] a, int[] b) {\n        Map<Integer, Integer> m = new HashMap<>();\n        Deque<Integer> s = new ArrayDeque<>();\n        for (int v : b) {\n            while (!s.isEmpty() && s.peek() < v) m.put(s.pop(), v);\n            s.push(v);\n        }\n        int[] out = new int[a.length];\n        for (int i = 0; i < a.length; i++) out[i] = m.getOrDefault(a[i], -1);\n        return out;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Next Greater Element I: what invariant makes the approach work?",
        "back": "Scan nums2 with a decreasing stack of unresolved values. A larger current value resolves every smaller top; record answers in a map for subset lookup."
      },
      {
        "type": "Complexity",
        "front": "Next Greater Element I: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n+m). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Next Greater Element I: what implementation trap should you check before submitting?",
        "back": "Return the first greater value, not the maximum of the suffix."
      },
      {
        "type": "Algorithm steps",
        "front": "Next Greater Element I: trace the algorithm on a small example, including its intermediate state.",
        "back": "nums1=[2,1], nums2=[2,3,1] yields [3,-1].\n\nScan nums2 with a decreasing stack of unresolved values. A larger current value resolves every smaller top; record answers in a map for subset lookup."
      }
    ],
    "testCode": "if (!(Arrays.equals(new Solution().nextGreaterElement(new int[]{2,1},new int[]{2,3,1}),new int[]{3,-1}))) throw new AssertionError(\"LC 496 failed\");\nif (!(new Solution().nextGreaterElement(new int[]{4},new int[]{4})[0]==-1)) throw new AssertionError(\"LC 496 failed\");"
  },
  {
    "id": "lc-503",
    "number": 503,
    "title": "Next Greater Element II",
    "slug": "next-greater-element-ii",
    "difficulty": "Medium",
    "tags": "Stack, Monotonic stack",
    "context": "Treat an integer array as circular. For each position return the first strictly greater value encountered moving right, or -1 if none exists.",
    "examples": "[2,1,3] yields [3,3,-1].",
    "solution": "Scan two virtual copies while keeping unresolved original indices in a decreasing stack. The second pass resolves wraparound candidates; push indices only in the first pass.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Equal values are not strictly greater.",
    "followUp": "Why are two passes enough even though traversal is circular?",
    "sourceUrl": "https://leetcode.com/problems/next-greater-element-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] nextGreaterElements(int[] a) {\n        int n = a.length;\n        int[] r = new int[n];\n        Arrays.fill(r, -1);\n        Deque<Integer> s = new ArrayDeque<>();\n        for (int i = 0; i < 2 * n; i++) {\n            int j = i % n;\n            while (!s.isEmpty() && a[s.peek()] < a[j]) r[s.pop()] = a[j];\n            if (i < n) s.push(i);\n        }\n        return r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Next Greater Element II: what invariant makes the approach work?",
        "back": "Scan two virtual copies while keeping unresolved original indices in a decreasing stack. The second pass resolves wraparound candidates; push indices only in the first pass."
      },
      {
        "type": "Complexity",
        "front": "Next Greater Element II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Next Greater Element II: what implementation trap should you check before submitting?",
        "back": "Equal values are not strictly greater."
      },
      {
        "type": "Algorithm steps",
        "front": "Next Greater Element II: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,1,3] yields [3,3,-1].\n\nScan two virtual copies while keeping unresolved original indices in a decreasing stack. The second pass resolves wraparound candidates; push indices only in the first pass."
      }
    ],
    "testCode": "if (!(Arrays.equals(new Solution().nextGreaterElements(new int[]{2,1,3}),new int[]{3,3,-1}))) throw new AssertionError(\"LC 503 failed\");\nif (!(new Solution().nextGreaterElements(new int[]{2,2})[0]==-1)) throw new AssertionError(\"LC 503 failed\");"
  },
  {
    "id": "lc-739",
    "number": 739,
    "title": "Daily Temperatures",
    "slug": "daily-temperatures",
    "difficulty": "Medium",
    "tags": "Stack, Monotonic stack",
    "context": "For each daily temperature return how many days later the first strictly warmer reading occurs; use zero when it never occurs.",
    "examples": "[60,58,62] yields [2,1,0].",
    "solution": "Store unresolved indices with nonincreasing temperatures. A warmer day pops each colder index and records the distance to this first resolving day.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Store indices rather than temperatures because the answer is a distance.",
    "followUp": "Explain why an equal-temperature day must remain unresolved.",
    "sourceUrl": "https://leetcode.com/problems/daily-temperatures/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] dailyTemperatures(int[] t) {\n        int[] a = new int[t.length];\n        Deque<Integer> s = new ArrayDeque<>();\n        for (int i = 0; i < t.length; i++) {\n            while (!s.isEmpty() && t[s.peek()] < t[i]) {\n                int j = s.pop();\n                a[j] = i - j;\n            }\n            s.push(i);\n        }\n        return a;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Daily Temperatures: what invariant makes the approach work?",
        "back": "Store unresolved indices with nonincreasing temperatures. A warmer day pops each colder index and records the distance to this first resolving day."
      },
      {
        "type": "Complexity",
        "front": "Daily Temperatures: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Daily Temperatures: what implementation trap should you check before submitting?",
        "back": "Store indices rather than temperatures because the answer is a distance."
      },
      {
        "type": "Algorithm steps",
        "front": "Daily Temperatures: trace the algorithm on a small example, including its intermediate state.",
        "back": "[60,58,62] yields [2,1,0].\n\nStore unresolved indices with nonincreasing temperatures. A warmer day pops each colder index and records the distance to this first resolving day."
      }
    ],
    "testCode": "if (!(Arrays.equals(new Solution().dailyTemperatures(new int[]{60,58,62}),new int[]{2,1,0}))) throw new AssertionError(\"LC 739 failed\");\nif (!(new Solution().dailyTemperatures(new int[]{60,60})[0]==0)) throw new AssertionError(\"LC 739 failed\");"
  },
  {
    "id": "lc-895",
    "number": 895,
    "title": "Maximum Frequency Stack",
    "slug": "maximum-frequency-stack",
    "difficulty": "Hard",
    "tags": "Stack, Design",
    "context": "Support push and pop where pop removes the most frequent value, breaking ties by the most recent push among tied values. Pop is called only when nonempty.",
    "examples": "push 2,5,2,5,7 then pop returns 5 because 2 and 5 tie and 5 was more recent.",
    "solution": "Track each value’s frequency and a stack for each achieved frequency. Pop from the highest frequency stack, reducing that value’s count and lowering max frequency when the group empties.",
    "timeComplexity": "Expected O(1) per operation",
    "spaceComplexity": "O(n)",
    "pitfall": "Do not erase older frequency-stack entries when a value’s frequency increases.",
    "followUp": "Explain why lower-frequency stacks automatically retain correct tie order.",
    "sourceUrl": "https://leetcode.com/problems/maximum-frequency-stack/",
    "code": "import java.util.*;\n\nclass FreqStack {\n\n    private Map<Integer, Integer> freq = new HashMap<>();\n    private Map<Integer, Deque<Integer>> groups = new HashMap<>();\n    private int max;\n\n    public FreqStack() {}\n\n    public void push(int v) {\n        int f = freq.getOrDefault(v, 0) + 1;\n        freq.put(v, f);\n        groups.computeIfAbsent(f, k -> new ArrayDeque<>()).push(v);\n        max = Math.max(max, f);\n    }\n\n    public int pop() {\n        int v = groups.get(max).pop();\n        freq.put(v, freq.get(v) - 1);\n        if (groups.get(max).isEmpty()) max--;\n        return v;\n    }\n\n    public static boolean check(int v) {\n        FreqStack s = new FreqStack();\n        s.push(v);\n        s.push(9);\n        s.push(v);\n        return s.pop() == v && s.pop() == 9;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximum Frequency Stack: what invariant makes the approach work?",
        "back": "Track each value’s frequency and a stack for each achieved frequency. Pop from the highest frequency stack, reducing that value’s count and lowering max frequency when the group empties."
      },
      {
        "type": "Complexity",
        "front": "Maximum Frequency Stack: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: Expected O(1) per operation. Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Maximum Frequency Stack: what implementation trap should you check before submitting?",
        "back": "Do not erase older frequency-stack entries when a value’s frequency increases."
      },
      {
        "type": "Algorithm steps",
        "front": "Maximum Frequency Stack: trace the algorithm on a small example, including its intermediate state.",
        "back": "push 2,5,2,5,7 then pop returns 5 because 2 and 5 tie and 5 was more recent.\n\nTrack each value’s frequency and a stack for each achieved frequency. Pop from the highest frequency stack, reducing that value’s count and lowering max frequency when the group empties."
      }
    ],
    "testCode": "if (!(FreqStack.check(2))) throw new AssertionError(\"LC 895 failed\");\nif (!(FreqStack.check(3))) throw new AssertionError(\"LC 895 failed\");"
  },
  {
    "id": "lc-901",
    "number": 901,
    "title": "Online Stock Span",
    "slug": "online-stock-span",
    "difficulty": "Medium",
    "tags": "Stack, Monotonic stack, Design",
    "context": "For each incoming price return the consecutive suffix length ending today in which every price is at most today’s price.",
    "examples": "Prices 30,20,25,35 produce spans 1,1,2,4.",
    "solution": "Store decreasing price/span pairs. Pop all prices no greater than today and absorb their spans, since each represents a contiguous block now covered.",
    "timeComplexity": "Amortized O(1) per next; O(n) worst case",
    "spaceComplexity": "O(n)",
    "pitfall": "Equal prices are included in the span and must be popped.",
    "followUp": "Why can storing aggregated spans replace storing every prior index?",
    "sourceUrl": "https://leetcode.com/problems/online-stock-span/",
    "code": "import java.util.*;\n\nclass StockSpanner {\n\n    private Deque<int[]> s = new ArrayDeque<>();\n\n    public StockSpanner() {}\n\n    public int next(int p) {\n        int span = 1;\n        while (!s.isEmpty() && s.peek()[0] <= p) span += s.pop()[1];\n        s.push(new int[] { p, span });\n        return span;\n    }\n\n    public static boolean check() {\n        StockSpanner s = new StockSpanner();\n        return (\n            s.next(30) == 1 &&\n            s.next(20) == 1 &&\n            s.next(25) == 2 &&\n            s.next(35) == 4\n        );\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Online Stock Span: what invariant makes the approach work?",
        "back": "Store decreasing price/span pairs. Pop all prices no greater than today and absorb their spans, since each represents a contiguous block now covered."
      },
      {
        "type": "Complexity",
        "front": "Online Stock Span: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: Amortized O(1) per next; O(n) worst case. Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Online Stock Span: what implementation trap should you check before submitting?",
        "back": "Equal prices are included in the span and must be popped."
      },
      {
        "type": "Algorithm steps",
        "front": "Online Stock Span: trace the algorithm on a small example, including its intermediate state.",
        "back": "Prices 30,20,25,35 produce spans 1,1,2,4.\n\nStore decreasing price/span pairs. Pop all prices no greater than today and absorb their spans, since each represents a contiguous block now covered."
      }
    ],
    "testCode": "if (!(new StockSpanner().next(10)==1)) throw new AssertionError(\"LC 901 failed\");\nif (!(StockSpanner.check())) throw new AssertionError(\"LC 901 failed\");"
  },
  {
    "id": "lc-1047",
    "number": 1047,
    "title": "Remove All Adjacent Duplicates In String",
    "slug": "remove-all-adjacent-duplicates-in-string",
    "difficulty": "Easy",
    "tags": "Stack",
    "context": "Repeatedly delete adjacent equal-letter pairs until no pair remains, and return the final string.",
    "examples": "\"abbaca\" reduces through \"aaca\" to \"ca\".",
    "solution": "Use a character stack: an equal top cancels with the current character, otherwise push. The stack is the fully reduced prefix after every input character.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "A deletion can expose a new pair across the removed region.",
    "followUp": "Generalize the stack to delete runs of k equal characters.",
    "sourceUrl": "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String removeDuplicates(String s) {\n        StringBuilder b = new StringBuilder();\n        for (char c : s.toCharArray()) {\n            int n = b.length();\n            if (n > 0 && b.charAt(n - 1) == c) b.setLength(n - 1);\n            else b.append(c);\n        }\n        return b.toString();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Remove All Adjacent Duplicates In String: what invariant makes the approach work?",
        "back": "Use a character stack: an equal top cancels with the current character, otherwise push. The stack is the fully reduced prefix after every input character."
      },
      {
        "type": "Complexity",
        "front": "Remove All Adjacent Duplicates In String: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Remove All Adjacent Duplicates In String: what implementation trap should you check before submitting?",
        "back": "A deletion can expose a new pair across the removed region."
      },
      {
        "type": "Algorithm steps",
        "front": "Remove All Adjacent Duplicates In String: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"abbaca\" reduces through \"aaca\" to \"ca\".\n\nUse a character stack: an equal top cancels with the current character, otherwise push. The stack is the fully reduced prefix after every input character."
      }
    ],
    "testCode": "if (!(new Solution().removeDuplicates(\"abbaca\").equals(\"ca\"))) throw new AssertionError(\"LC 1047 failed\");\nif (!(new Solution().removeDuplicates(\"abba\").equals(\"\"))) throw new AssertionError(\"LC 1047 failed\");"
  },
  {
    "id": "lc-1249",
    "number": 1249,
    "title": "Minimum Remove to Make Valid Parentheses",
    "slug": "minimum-remove-to-make-valid-parentheses",
    "difficulty": "Medium",
    "tags": "Stack",
    "context": "Remove the fewest round parentheses from a string containing lowercase letters and parentheses so the result is balanced. Return any valid minimal-removal result.",
    "examples": "\"a)b(c)d\" can become \"ab(c)d\".",
    "solution": "Track unmatched opening indices and mark unmatched closers. After scanning, mark all remaining openers, then rebuild without marked characters.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Keep all letters; only unmatched parentheses should be removed.",
    "followUp": "Derive a two-pass implementation without an explicit index stack.",
    "sourceUrl": "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String minRemoveToMakeValid(String s) {\n        boolean[] drop = new boolean[s.length()];\n        Deque<Integer> st = new ArrayDeque<>();\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c == '(') st.push(i);\n            else if (c == ')') {\n                if (st.isEmpty()) drop[i] = true;\n                else st.pop();\n            }\n        }\n        while (!st.isEmpty()) drop[st.pop()] = true;\n        StringBuilder b = new StringBuilder();\n        for (int i = 0; i < s.length(); i++) if (!drop[i]) b.append(\n            s.charAt(i)\n        );\n        return b.toString();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Remove to Make Valid Parentheses: what invariant makes the approach work?",
        "back": "Track unmatched opening indices and mark unmatched closers. After scanning, mark all remaining openers, then rebuild without marked characters."
      },
      {
        "type": "Complexity",
        "front": "Minimum Remove to Make Valid Parentheses: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Minimum Remove to Make Valid Parentheses: what implementation trap should you check before submitting?",
        "back": "Keep all letters; only unmatched parentheses should be removed."
      },
      {
        "type": "Algorithm steps",
        "front": "Minimum Remove to Make Valid Parentheses: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"a)b(c)d\" can become \"ab(c)d\".\n\nTrack unmatched opening indices and mark unmatched closers. After scanning, mark all remaining openers, then rebuild without marked characters."
      }
    ],
    "testCode": "if (!(new Solution().minRemoveToMakeValid(\"a)b(c)d\").equals(\"ab(c)d\"))) throw new AssertionError(\"LC 1249 failed\");\nif (!(new Solution().minRemoveToMakeValid(\"((\").equals(\"\"))) throw new AssertionError(\"LC 1249 failed\");"
  },
  {
    "id": "lc-2390",
    "number": 2390,
    "title": "Removing Stars From a String",
    "slug": "removing-stars-from-a-string",
    "difficulty": "Medium",
    "tags": "Stack",
    "context": "Each star removes itself and the nearest still-present non-star character to its left. Input guarantees all removals are possible.",
    "examples": "\"ab*c*\" leaves \"a\".",
    "solution": "Build the surviving prefix as a stack. Append letters and remove the last surviving letter for each star; this exactly tracks the nearest available character.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "A star removes the latest surviving letter, not necessarily its original neighbor.",
    "followUp": "Explain why the validity guarantee makes checking for an empty stack optional.",
    "sourceUrl": "https://leetcode.com/problems/removing-stars-from-a-string/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String removeStars(String s) {\n        StringBuilder b = new StringBuilder();\n        for (char c : s.toCharArray()) {\n            if (c == '*') b.setLength(b.length() - 1);\n            else b.append(c);\n        }\n        return b.toString();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Removing Stars From a String: what invariant makes the approach work?",
        "back": "Build the surviving prefix as a stack. Append letters and remove the last surviving letter for each star; this exactly tracks the nearest available character."
      },
      {
        "type": "Complexity",
        "front": "Removing Stars From a String: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Removing Stars From a String: what implementation trap should you check before submitting?",
        "back": "A star removes the latest surviving letter, not necessarily its original neighbor."
      },
      {
        "type": "Algorithm steps",
        "front": "Removing Stars From a String: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"ab*c*\" leaves \"a\".\n\nBuild the surviving prefix as a stack. Append letters and remove the last surviving letter for each star; this exactly tracks the nearest available character."
      }
    ],
    "testCode": "if (!(new Solution().removeStars(\"ab*c*\").equals(\"a\"))) throw new AssertionError(\"LC 2390 failed\");\nif (!(new Solution().removeStars(\"ab**\").equals(\"\"))) throw new AssertionError(\"LC 2390 failed\");"
  },
  {
    "id": "lc-215",
    "number": 215,
    "title": "Kth Largest Element in an Array",
    "slug": "kth-largest-element-in-an-array",
    "difficulty": "Medium",
    "tags": "Heap",
    "context": "Return the kth element in descending sorted order of an integer array, counting duplicates. k is valid.",
    "examples": "[6,2,6,4], k=2 returns 6.",
    "solution": "Maintain a min-heap of the largest k values seen. If a new insertion exceeds size k, remove the smallest; the root is the kth largest at the end.",
    "timeComplexity": "O(n log k)",
    "spaceComplexity": "O(k)",
    "pitfall": "The task counts duplicates rather than distinct values.",
    "followUp": "Compare this deterministic bound with randomized quickselect’s expected linear time.",
    "sourceUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findKthLargest(int[] a, int k) {\n        PriorityQueue<Integer> q = new PriorityQueue<>();\n        for (int v : a) {\n            q.add(v);\n            if (q.size() > k) q.remove();\n        }\n        return q.element();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Kth Largest Element in an Array: what invariant makes the approach work?",
        "back": "Maintain a min-heap of the largest k values seen. If a new insertion exceeds size k, remove the smallest; the root is the kth largest at the end."
      },
      {
        "type": "Complexity",
        "front": "Kth Largest Element in an Array: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n log k). Auxiliary space: O(k)."
      },
      {
        "type": "Edge case",
        "front": "Kth Largest Element in an Array: what implementation trap should you check before submitting?",
        "back": "The task counts duplicates rather than distinct values."
      },
      {
        "type": "Algorithm steps",
        "front": "Kth Largest Element in an Array: trace the algorithm on a small example, including its intermediate state.",
        "back": "[6,2,6,4], k=2 returns 6.\n\nMaintain a min-heap of the largest k values seen. If a new insertion exceeds size k, remove the smallest; the root is the kth largest at the end."
      }
    ],
    "testCode": "if (!(new Solution().findKthLargest(new int[]{6,2,6,4},2)==6)) throw new AssertionError(\"LC 215 failed\");\nif (!(new Solution().findKthLargest(new int[]{-3,-1},2)==-3)) throw new AssertionError(\"LC 215 failed\");"
  },
  {
    "id": "lc-295",
    "number": 295,
    "title": "Find Median from Data Stream",
    "slug": "find-median-from-data-stream",
    "difficulty": "Hard",
    "tags": "Heap, Design",
    "context": "Support adding integers and querying the median of all added values. Median queries occur only after at least one insertion.",
    "examples": "After adding 4 and 8 the median is 6; adding 5 changes it to 5.",
    "solution": "Keep a max-heap for the lower half and min-heap for the upper half, with lower having equal size or one extra. Transfer through heap roots to preserve partition order.",
    "timeComplexity": "O(log n) insertion; O(1) median",
    "spaceComplexity": "O(n)",
    "pitfall": "Cast before adding the two middle integers to avoid overflow.",
    "followUp": "For a small fixed value range, compare frequency buckets with heaps.",
    "sourceUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "code": "import java.util.*;\n\nclass MedianFinder {\n\n    private PriorityQueue<Integer> lo = new PriorityQueue<>(\n            Comparator.reverseOrder()\n        ),\n        hi = new PriorityQueue<>();\n\n    public MedianFinder() {}\n\n    public void addNum(int x) {\n        lo.add(x);\n        hi.add(lo.remove());\n        if (hi.size() > lo.size()) lo.add(hi.remove());\n    }\n\n    public double findMedian() {\n        return lo.size() > hi.size()\n            ? lo.element()\n            : ((long) lo.element() + hi.element()) / 2.0;\n    }\n\n    public static boolean check(int a, int b) {\n        MedianFinder m = new MedianFinder();\n        m.addNum(a);\n        m.addNum(b);\n        return m.findMedian() == ((long) a + b) / 2.0;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find Median from Data Stream: what invariant makes the approach work?",
        "back": "Keep a max-heap for the lower half and min-heap for the upper half, with lower having equal size or one extra. Transfer through heap roots to preserve partition order."
      },
      {
        "type": "Complexity",
        "front": "Find Median from Data Stream: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(log n) insertion; O(1) median. Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Find Median from Data Stream: what implementation trap should you check before submitting?",
        "back": "Cast before adding the two middle integers to avoid overflow."
      },
      {
        "type": "Algorithm steps",
        "front": "Find Median from Data Stream: trace the algorithm on a small example, including its intermediate state.",
        "back": "After adding 4 and 8 the median is 6; adding 5 changes it to 5.\n\nKeep a max-heap for the lower half and min-heap for the upper half, with lower having equal size or one extra. Transfer through heap roots to preserve partition order."
      }
    ],
    "testCode": "if (!(MedianFinder.check(4,8))) throw new AssertionError(\"LC 295 failed\");\nif (!(MedianFinder.check(Integer.MAX_VALUE,Integer.MAX_VALUE))) throw new AssertionError(\"LC 295 failed\");\nMedianFinder m=new MedianFinder();m.addNum(4);m.addNum(8);m.addNum(5);if(m.findMedian()!=5)throw new AssertionError(\"odd median\");"
  },
  {
    "id": "lc-347",
    "number": 347,
    "title": "Top K Frequent Elements",
    "slug": "top-k-frequent-elements",
    "difficulty": "Medium",
    "tags": "Heap, Hash map",
    "context": "Return any ordering of the k most frequent distinct array values. The requested top-k set is guaranteed unique.",
    "examples": "[2,2,2,7,7,9], k=2 returns {2,7}.",
    "solution": "Count values, then keep a min-heap of at most k entries ranked by frequency. Removing the least frequent preserves the strongest k candidates.",
    "timeComplexity": "O(n + u log k), u distinct values",
    "spaceComplexity": "O(u+k)",
    "pitfall": "Frequency ranking differs from numeric ranking.",
    "followUp": "Use frequency-indexed buckets to achieve linear time.",
    "sourceUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] topKFrequent(int[] a, int k) {\n        Map<Integer, Integer> f = new HashMap<>();\n        for (int v : a) f.merge(v, 1, Integer::sum);\n        PriorityQueue<Integer> q = new PriorityQueue<>(\n            Comparator.comparingInt(f::get)\n        );\n        for (int v : f.keySet()) {\n            q.add(v);\n            if (q.size() > k) q.remove();\n        }\n        int[] r = new int[k];\n        for (int i = 0; i < k; i++) r[i] = q.remove();\n        return r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Top K Frequent Elements: what invariant makes the approach work?",
        "back": "Count values, then keep a min-heap of at most k entries ranked by frequency. Removing the least frequent preserves the strongest k candidates."
      },
      {
        "type": "Complexity",
        "front": "Top K Frequent Elements: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n + u log k), u distinct values. Auxiliary space: O(u+k)."
      },
      {
        "type": "Edge case",
        "front": "Top K Frequent Elements: what implementation trap should you check before submitting?",
        "back": "Frequency ranking differs from numeric ranking."
      },
      {
        "type": "Algorithm steps",
        "front": "Top K Frequent Elements: trace the algorithm on a small example, including its intermediate state.",
        "back": "[2,2,2,7,7,9], k=2 returns {2,7}.\n\nCount values, then keep a min-heap of at most k entries ranked by frequency. Removing the least frequent preserves the strongest k candidates."
      }
    ],
    "testCode": "if (!(new Solution().topKFrequent(new int[]{2,2,7},1)[0]==2)) throw new AssertionError(\"LC 347 failed\");\nif (!(new Solution().topKFrequent(new int[]{-1},1)[0]==-1)) throw new AssertionError(\"LC 347 failed\");"
  },
  {
    "id": "lc-373",
    "number": 373,
    "title": "Find K Pairs with Smallest Sums",
    "slug": "find-k-pairs-with-smallest-sums",
    "difficulty": "Medium",
    "tags": "Heap",
    "context": "Given two ascending nonempty integer arrays, return up to k value pairs with smallest pair sums, choosing one value from each array. Duplicate positions form distinct pairs.",
    "examples": "[1,4] and [2,3], k=2 yields [[1,2],[1,3]].",
    "solution": "Treat each first-array index as a sorted row of pairs. Seed at most k row heads in a heap and after popping (i,j), insert (i,j+1).",
    "timeComplexity": "O(k log min(k,m)), bounded by available pairs",
    "spaceComplexity": "O(min(k,m)), excluding output",
    "pitfall": "Use long for sum comparisons to avoid overflow.",
    "followUp": "Why can rows after the first k be omitted from the initial heap?",
    "sourceUrl": "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> kSmallestPairs(int[] a, int[] b, int k) {\n        List<List<Integer>> r = new ArrayList<>();\n        if (a.length == 0 || b.length == 0) return r;\n        PriorityQueue<int[]> q = new PriorityQueue<>((x, y) ->\n            Long.compare((long) a[x[0]] + b[x[1]], (long) a[y[0]] + b[y[1]])\n        );\n        for (int i = 0; i < Math.min(a.length, k); i++) q.add(new int[] {\n            i,\n            0,\n        });\n        while (k-- > 0 && !q.isEmpty()) {\n            int[] p = q.remove();\n            r.add(List.of(a[p[0]], b[p[1]]));\n            if (p[1] + 1 < b.length) q.add(new int[] { p[0], p[1] + 1 });\n        }\n        return r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Find K Pairs with Smallest Sums: what invariant makes the approach work?",
        "back": "Treat each first-array index as a sorted row of pairs. Seed at most k row heads in a heap and after popping (i,j), insert (i,j+1)."
      },
      {
        "type": "Complexity",
        "front": "Find K Pairs with Smallest Sums: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(k log min(k,m)), bounded by available pairs. Auxiliary space: O(min(k,m)), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Find K Pairs with Smallest Sums: what implementation trap should you check before submitting?",
        "back": "Use long for sum comparisons to avoid overflow."
      },
      {
        "type": "Algorithm steps",
        "front": "Find K Pairs with Smallest Sums: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,4] and [2,3], k=2 yields [[1,2],[1,3]].\n\nTreat each first-array index as a sorted row of pairs. Seed at most k row heads in a heap and after popping (i,j), insert (i,j+1)."
      }
    ],
    "testCode": "if (!(new Solution().kSmallestPairs(new int[]{1,4},new int[]{2,3},2).equals(List.of(List.of(1,2),List.of(1,3))))) throw new AssertionError(\"LC 373 failed\");\nif (!(new Solution().kSmallestPairs(new int[]{1},new int[]{2},5).size()==1)) throw new AssertionError(\"LC 373 failed\");"
  },
  {
    "id": "lc-378",
    "number": 378,
    "title": "Kth Smallest Element in a Sorted Matrix",
    "slug": "kth-smallest-element-in-a-sorted-matrix",
    "difficulty": "Medium",
    "tags": "Heap",
    "context": "An n-by-n matrix is nondecreasing across every row and column. Return the kth smallest value, counting duplicates.",
    "examples": "[[1,3],[2,4]], k=3 returns 3.",
    "solution": "Merge sorted rows with a min-heap of row frontiers. Pop k times and advance only the popped row; each extraction is the next global ordered value.",
    "timeComplexity": "O((n+k) log n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Equal matrix values occupy separate ranks.",
    "followUp": "Compare row merging with searching the value range using a counting predicate.",
    "sourceUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int kthSmallest(int[][] m, int k) {\n        PriorityQueue<int[]> q = new PriorityQueue<>(\n            Comparator.comparingInt(p -> m[p[0]][p[1]])\n        );\n        for (int i = 0; i < m.length; i++) q.add(new int[] { i, 0 });\n        int value = 0;\n        while (k-- > 0) {\n            int[] p = q.remove();\n            value = m[p[0]][p[1]];\n            if (p[1] + 1 < m[p[0]].length) q.add(new int[] { p[0], p[1] + 1 });\n        }\n        return value;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Kth Smallest Element in a Sorted Matrix: what invariant makes the approach work?",
        "back": "Merge sorted rows with a min-heap of row frontiers. Pop k times and advance only the popped row; each extraction is the next global ordered value."
      },
      {
        "type": "Complexity",
        "front": "Kth Smallest Element in a Sorted Matrix: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O((n+k) log n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Kth Smallest Element in a Sorted Matrix: what implementation trap should you check before submitting?",
        "back": "Equal matrix values occupy separate ranks."
      },
      {
        "type": "Algorithm steps",
        "front": "Kth Smallest Element in a Sorted Matrix: trace the algorithm on a small example, including its intermediate state.",
        "back": "[[1,3],[2,4]], k=3 returns 3.\n\nMerge sorted rows with a min-heap of row frontiers. Pop k times and advance only the popped row; each extraction is the next global ordered value."
      }
    ],
    "testCode": "if (!(new Solution().kthSmallest(new int[][]{{1,3},{2,4}},3)==3)) throw new AssertionError(\"LC 378 failed\");\nif (!(new Solution().kthSmallest(new int[][]{{2,2},{2,3}},3)==2)) throw new AssertionError(\"LC 378 failed\");"
  },
  {
    "id": "lc-621",
    "number": 621,
    "title": "Task Scheduler",
    "slug": "task-scheduler",
    "difficulty": "Medium",
    "tags": "Heap, Greedy",
    "context": "Unit-time tasks are uppercase letters. Equal task labels must be separated by at least n intervals; idle intervals are allowed. Return the minimum schedule length.",
    "examples": "Tasks A,A,B with n=2 need 4 intervals: A,B,idle,A.",
    "solution": "The most frequent labels create maxCount-1 full blocks of length n+1 plus a final slot for each tied maximum. The answer is the larger of this frame and task count.",
    "timeComplexity": "O(tasks + 26)",
    "spaceComplexity": "O(1)",
    "pitfall": "All labels tied for maximum contribute to the final frame length.",
    "followUp": "Construct an actual schedule with a heap and cooldown queue.",
    "sourceUrl": "https://leetcode.com/problems/task-scheduler/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int leastInterval(char[] tasks, int n) {\n        int[] f = new int[26];\n        int max = 0,\n            count = 0;\n        for (char c : tasks) max = Math.max(max, ++f[c - 'A']);\n        for (int v : f) if (v == max) count++;\n        return Math.max(tasks.length, (max - 1) * (n + 1) + count);\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Task Scheduler: what invariant makes the approach work?",
        "back": "The most frequent labels create maxCount-1 full blocks of length n+1 plus a final slot for each tied maximum. The answer is the larger of this frame and task count."
      },
      {
        "type": "Complexity",
        "front": "Task Scheduler: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(tasks + 26). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Task Scheduler: what implementation trap should you check before submitting?",
        "back": "All labels tied for maximum contribute to the final frame length."
      },
      {
        "type": "Algorithm steps",
        "front": "Task Scheduler: trace the algorithm on a small example, including its intermediate state.",
        "back": "Tasks A,A,B with n=2 need 4 intervals: A,B,idle,A.\n\nThe most frequent labels create maxCount-1 full blocks of length n+1 plus a final slot for each tied maximum. The answer is the larger of this frame and task count."
      }
    ],
    "testCode": "if (!(new Solution().leastInterval(new char[]{'A','A','B'},2)==4)) throw new AssertionError(\"LC 621 failed\");\nif (!(new Solution().leastInterval(new char[]{'A','A','B'},0)==3)) throw new AssertionError(\"LC 621 failed\");"
  },
  {
    "id": "lc-703",
    "number": 703,
    "title": "Kth Largest Element in a Stream",
    "slug": "kth-largest-element-in-a-stream",
    "difficulty": "Easy",
    "tags": "Heap, Design",
    "context": "Initialize a stream with numbers and positive k. On every add return its kth largest value, counting duplicates; calls provide enough values for that rank.",
    "examples": "k=2 with [3,7], then add(5) returns 5.",
    "solution": "Keep a min-heap of the largest k seen values. Trim the smallest when size exceeds k, so the root always represents the kth-largest retained boundary.",
    "timeComplexity": "O(log k) per add; O(n log k) initialization",
    "spaceComplexity": "O(k)",
    "pitfall": "A value equal to the boundary still counts as another occurrence.",
    "followUp": "How would supporting changing k affect retained state?",
    "sourceUrl": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    "code": "import java.util.*;\n\nclass KthLargest {\n\n    private int k;\n    private PriorityQueue<Integer> q = new PriorityQueue<>();\n\n    public KthLargest(int k, int[] nums) {\n        this.k = k;\n        for (int n : nums) add(n);\n    }\n\n    public int add(int v) {\n        q.add(v);\n        if (q.size() > k) q.remove();\n        return q.element();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Kth Largest Element in a Stream: what invariant makes the approach work?",
        "back": "Keep a min-heap of the largest k seen values. Trim the smallest when size exceeds k, so the root always represents the kth-largest retained boundary."
      },
      {
        "type": "Complexity",
        "front": "Kth Largest Element in a Stream: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(log k) per add; O(n log k) initialization. Auxiliary space: O(k)."
      },
      {
        "type": "Edge case",
        "front": "Kth Largest Element in a Stream: what implementation trap should you check before submitting?",
        "back": "A value equal to the boundary still counts as another occurrence."
      },
      {
        "type": "Algorithm steps",
        "front": "Kth Largest Element in a Stream: trace the algorithm on a small example, including its intermediate state.",
        "back": "k=2 with [3,7], then add(5) returns 5.\n\nKeep a min-heap of the largest k seen values. Trim the smallest when size exceeds k, so the root always represents the kth-largest retained boundary."
      }
    ],
    "testCode": "if (!(new KthLargest(2,new int[]{3,7}).add(5)==5)) throw new AssertionError(\"LC 703 failed\");\nif (!(new KthLargest(1,new int[]{}).add(-2)==-2)) throw new AssertionError(\"LC 703 failed\");"
  },
  {
    "id": "lc-767",
    "number": 767,
    "title": "Reorganize String",
    "slug": "reorganize-string",
    "difficulty": "Medium",
    "tags": "Heap, Greedy",
    "context": "Rearrange a lowercase string so adjacent letters differ, or return an empty string if impossible. Any valid arrangement is accepted.",
    "examples": "\"aab\" may become \"aba\"; \"aaab\" is impossible.",
    "solution": "Repeatedly take the most frequent available letter and hold it out of the heap for one step. Reinsert the previously held letter after selecting the next, forbidding adjacent equality.",
    "timeComplexity": "O(n log alphabet)",
    "spaceComplexity": "O(alphabet), excluding output",
    "pitfall": "If a held letter remains after the heap empties, the arrangement is impossible.",
    "followUp": "Prove the feasibility condition max frequency ≤ ceil(n/2).",
    "sourceUrl": "https://leetcode.com/problems/reorganize-string/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String reorganizeString(String s) {\n        int[] f = new int[26];\n        for (char c : s.toCharArray()) f[c - 'a']++;\n        PriorityQueue<int[]> q = new PriorityQueue<>((a, b) ->\n            Integer.compare(b[1], a[1])\n        );\n        for (int i = 0; i < 26; i++) if (f[i] > 0) q.add(new int[] { i, f[i] });\n        int[] prev = null;\n        StringBuilder b = new StringBuilder();\n        while (!q.isEmpty()) {\n            int[] x = q.remove();\n            b.append((char) ('a' + x[0]));\n            x[1]--;\n            if (prev != null && prev[1] > 0) q.add(prev);\n            prev = x;\n        }\n        return b.length() == s.length() ? b.toString() : \"\";\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reorganize String: what invariant makes the approach work?",
        "back": "Repeatedly take the most frequent available letter and hold it out of the heap for one step. Reinsert the previously held letter after selecting the next, forbidding adjacent equality."
      },
      {
        "type": "Complexity",
        "front": "Reorganize String: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n log alphabet). Auxiliary space: O(alphabet), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Reorganize String: what implementation trap should you check before submitting?",
        "back": "If a held letter remains after the heap empties, the arrangement is impossible."
      },
      {
        "type": "Algorithm steps",
        "front": "Reorganize String: trace the algorithm on a small example, including its intermediate state.",
        "back": "\"aab\" may become \"aba\"; \"aaab\" is impossible.\n\nRepeatedly take the most frequent available letter and hold it out of the heap for one step. Reinsert the previously held letter after selecting the next, forbidding adjacent equality."
      }
    ],
    "testCode": "if (!(new Solution().reorganizeString(\"aab\").equals(\"aba\"))) throw new AssertionError(\"LC 767 failed\");\nif (!(new Solution().reorganizeString(\"aaab\").equals(\"\"))) throw new AssertionError(\"LC 767 failed\");"
  },
  {
    "id": "lc-973",
    "number": 973,
    "title": "K Closest Points to Origin",
    "slug": "k-closest-points-to-origin",
    "difficulty": "Medium",
    "tags": "Heap",
    "context": "Return any ordering of the k two-dimensional points closest to (0,0) by Euclidean distance. The accepted subset is determined by the problem’s inputs.",
    "examples": "[[3,4],[1,1]], k=1 returns [[1,1]].",
    "solution": "Keep a max-heap of at most k points ranked by squared distance. Discard the farthest whenever size exceeds k; square roots are unnecessary for ordering.",
    "timeComplexity": "O(n log k)",
    "spaceComplexity": "O(k)",
    "pitfall": "Compute squared distances in long before addition.",
    "followUp": "Compare heap selection with in-place quickselect.",
    "sourceUrl": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    long d(int[] p) {\n        return (long) p[0] * p[0] + (long) p[1] * p[1];\n    }\n\n    public int[][] kClosest(int[][] p, int k) {\n        PriorityQueue<int[]> q = new PriorityQueue<>((a, b) ->\n            Long.compare(d(b), d(a))\n        );\n        for (int[] v : p) {\n            q.add(v);\n            if (q.size() > k) q.remove();\n        }\n        int[][] r = new int[k][];\n        for (int i = 0; i < k; i++) r[i] = q.remove();\n        return r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "K Closest Points to Origin: what invariant makes the approach work?",
        "back": "Keep a max-heap of at most k points ranked by squared distance. Discard the farthest whenever size exceeds k; square roots are unnecessary for ordering."
      },
      {
        "type": "Complexity",
        "front": "K Closest Points to Origin: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n log k). Auxiliary space: O(k)."
      },
      {
        "type": "Edge case",
        "front": "K Closest Points to Origin: what implementation trap should you check before submitting?",
        "back": "Compute squared distances in long before addition."
      },
      {
        "type": "Algorithm steps",
        "front": "K Closest Points to Origin: trace the algorithm on a small example, including its intermediate state.",
        "back": "[[3,4],[1,1]], k=1 returns [[1,1]].\n\nKeep a max-heap of at most k points ranked by squared distance. Discard the farthest whenever size exceeds k; square roots are unnecessary for ordering."
      }
    ],
    "testCode": "if (!(Arrays.equals(new Solution().kClosest(new int[][]{{3,4},{1,1}},1)[0],new int[]{1,1}))) throw new AssertionError(\"LC 973 failed\");\nif (!(new Solution().kClosest(new int[][]{{0,0}},1)[0][0]==0)) throw new AssertionError(\"LC 973 failed\");"
  },
  {
    "id": "lc-1046",
    "number": 1046,
    "title": "Last Stone Weight",
    "slug": "last-stone-weight",
    "difficulty": "Easy",
    "tags": "Heap",
    "context": "Repeatedly smash the two heaviest positive-weight stones. Equal stones disappear; otherwise insert their difference. Return the last weight or zero.",
    "examples": "[4,3,2] becomes [2,1], then [1], so return 1.",
    "solution": "Use a max-heap to expose the next two largest stones. Remove both and insert only a nonzero difference until at most one remains.",
    "timeComplexity": "O(n log n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Equal weights produce no replacement stone.",
    "followUp": "For a small bounded weight range, compare a counting-array approach.",
    "sourceUrl": "https://leetcode.com/problems/last-stone-weight/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int lastStoneWeight(int[] stones) {\n        PriorityQueue<Integer> q = new PriorityQueue<>(\n            Comparator.reverseOrder()\n        );\n        for (int s : stones) q.add(s);\n        while (q.size() > 1) {\n            int a = q.remove(),\n                b = q.remove();\n            if (a != b) q.add(a - b);\n        }\n        return q.isEmpty() ? 0 : q.remove();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Last Stone Weight: what invariant makes the approach work?",
        "back": "Use a max-heap to expose the next two largest stones. Remove both and insert only a nonzero difference until at most one remains."
      },
      {
        "type": "Complexity",
        "front": "Last Stone Weight: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n log n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Last Stone Weight: what implementation trap should you check before submitting?",
        "back": "Equal weights produce no replacement stone."
      },
      {
        "type": "Algorithm steps",
        "front": "Last Stone Weight: trace the algorithm on a small example, including its intermediate state.",
        "back": "[4,3,2] becomes [2,1], then [1], so return 1.\n\nUse a max-heap to expose the next two largest stones. Remove both and insert only a nonzero difference until at most one remains."
      }
    ],
    "testCode": "if (!(new Solution().lastStoneWeight(new int[]{4,3,2})==1)) throw new AssertionError(\"LC 1046 failed\");\nif (!(new Solution().lastStoneWeight(new int[]{2,2})==0)) throw new AssertionError(\"LC 1046 failed\");"
  },
  {
    "id": "lc-94",
    "number": 94,
    "title": "Binary Tree Inorder Traversal",
    "slug": "binary-tree-inorder-traversal",
    "difficulty": "Easy",
    "tags": "Binary tree, Stack",
    "context": "Return node values in left-subtree, root, right-subtree order for an arbitrary binary tree. Empty input yields an empty list.",
    "examples": "Root 2 with children 1 and 3 yields [1,2,3].",
    "solution": "Push the entire left path. Pop and visit its lowest unfinished node, then traverse its right subtree; the stack records ancestors awaiting their turn.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h), excluding output",
    "pitfall": "This order is sorted only when the input is a binary search tree.",
    "followUp": "Describe Morris traversal and how it temporarily changes pointers.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> r = new ArrayList<>();\n        Deque<TreeNode> s = new ArrayDeque<>();\n        while (root != null || !s.isEmpty()) {\n            while (root != null) {\n                s.push(root);\n                root = root.left;\n            }\n            root = s.pop();\n            r.add(root.val);\n            root = root.right;\n        }\n        return r;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Inorder Traversal: what invariant makes the approach work?",
        "back": "Push the entire left path. Pop and visit its lowest unfinished node, then traverse its right subtree; the stack records ancestors awaiting their turn."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Inorder Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Inorder Traversal: what implementation trap should you check before submitting?",
        "back": "This order is sorted only when the input is a binary search tree."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Inorder Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 2 with children 1 and 3 yields [1,2,3].\n\nPush the entire left path. Pop and visit its lowest unfinished node, then traverse its right subtree; the stack records ancestors awaiting their turn."
      }
    ],
    "testCode": "if (!(new Solution().inorderTraversal(null).isEmpty())) throw new AssertionError(\"LC 94 failed\");\nif (!(new Solution().inorderTraversal(new TreeNode(2,new TreeNode(1),new TreeNode(3))).equals(List.of(1,2,3)))) throw new AssertionError(\"LC 94 failed\");"
  },
  {
    "id": "lc-98",
    "number": 98,
    "title": "Validate Binary Search Tree",
    "slug": "validate-binary-search-tree",
    "difficulty": "Medium",
    "tags": "Binary tree, BST",
    "context": "Determine whether every node has all left descendants strictly smaller and all right descendants strictly larger. Duplicate keys are invalid.",
    "examples": "Root 5 with right child 7 whose left child is 4 is invalid, despite each immediate parent relation except the inherited bound.",
    "solution": "Carry an open interval of allowable values from ancestors. A left child tightens the upper bound and a right child tightens the lower bound.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Checking only direct children misses ancestor violations; use long bounds for int extremes.",
    "followUp": "Give an inorder-based validation and explain its strict-increase condition.",
    "sourceUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isValidBST(TreeNode root) {\n        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);\n    }\n\n    boolean valid(TreeNode n, long lo, long hi) {\n        return (\n            n == null ||\n            (n.val > lo &&\n                n.val < hi &&\n                valid(n.left, lo, n.val) &&\n                valid(n.right, n.val, hi))\n        );\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Validate Binary Search Tree: what invariant makes the approach work?",
        "back": "Carry an open interval of allowable values from ancestors. A left child tightens the upper bound and a right child tightens the lower bound."
      },
      {
        "type": "Complexity",
        "front": "Validate Binary Search Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Validate Binary Search Tree: what implementation trap should you check before submitting?",
        "back": "Checking only direct children misses ancestor violations; use long bounds for int extremes."
      },
      {
        "type": "Algorithm steps",
        "front": "Validate Binary Search Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 5 with right child 7 whose left child is 4 is invalid, despite each immediate parent relation except the inherited bound.\n\nCarry an open interval of allowable values from ancestors. A left child tightens the upper bound and a right child tightens the lower bound."
      }
    ],
    "testCode": "if (!(new Solution().isValidBST(new TreeNode(Integer.MIN_VALUE)))) throw new AssertionError(\"LC 98 failed\");\nif (!(!new Solution().isValidBST(new TreeNode(5,null,new TreeNode(7,new TreeNode(4),null))))) throw new AssertionError(\"LC 98 failed\");"
  },
  {
    "id": "lc-100",
    "number": 100,
    "title": "Same Tree",
    "slug": "same-tree",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Determine whether two binary trees have identical structure and equal values at corresponding positions.",
    "examples": "A root with only a left child differs from the same values arranged as a right child.",
    "solution": "Two null roots match. Exactly one null root fails. Otherwise compare values and recursively compare both corresponding child pairs.",
    "timeComplexity": "O(min(n,m)) until mismatch; O(n) for equal trees",
    "spaceComplexity": "O(h)",
    "pitfall": "Matching traversal values alone can conceal different shapes.",
    "followUp": "Write an iterative comparison using pairs of nodes.",
    "sourceUrl": "https://leetcode.com/problems/same-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        if (p == null || q == null) return p == q;\n        return (\n            p.val == q.val &&\n            isSameTree(p.left, q.left) &&\n            isSameTree(p.right, q.right)\n        );\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Same Tree: what invariant makes the approach work?",
        "back": "Two null roots match. Exactly one null root fails. Otherwise compare values and recursively compare both corresponding child pairs."
      },
      {
        "type": "Complexity",
        "front": "Same Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(min(n,m)) until mismatch; O(n) for equal trees. Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Same Tree: what implementation trap should you check before submitting?",
        "back": "Matching traversal values alone can conceal different shapes."
      },
      {
        "type": "Algorithm steps",
        "front": "Same Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "A root with only a left child differs from the same values arranged as a right child.\n\nTwo null roots match. Exactly one null root fails. Otherwise compare values and recursively compare both corresponding child pairs."
      }
    ],
    "testCode": "if (!(new Solution().isSameTree(null,null))) throw new AssertionError(\"LC 100 failed\");\nif (!(!new Solution().isSameTree(new TreeNode(1,new TreeNode(2),null),new TreeNode(1,null,new TreeNode(2))))) throw new AssertionError(\"LC 100 failed\");"
  },
  {
    "id": "lc-101",
    "number": 101,
    "title": "Symmetric Tree",
    "slug": "symmetric-tree",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Determine whether a binary tree is unchanged by reflection about its root: mirrored nodes must match in value and structure.",
    "examples": "Root 1 with two children valued 2 and no grandchildren is symmetric.",
    "solution": "Compare a pair of mirrored subtrees: values must match, first.left matches second.right, and first.right matches second.left.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Comparing left-left and right-right tests equality instead of symmetry.",
    "followUp": "Implement an iterative queue of mirrored pairs.",
    "sourceUrl": "https://leetcode.com/problems/symmetric-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isSymmetric(TreeNode r) {\n        return r == null || mirror(r.left, r.right);\n    }\n\n    boolean mirror(TreeNode a, TreeNode b) {\n        if (a == null || b == null) return a == b;\n        return (\n            a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left)\n        );\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Symmetric Tree: what invariant makes the approach work?",
        "back": "Compare a pair of mirrored subtrees: values must match, first.left matches second.right, and first.right matches second.left."
      },
      {
        "type": "Complexity",
        "front": "Symmetric Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Symmetric Tree: what implementation trap should you check before submitting?",
        "back": "Comparing left-left and right-right tests equality instead of symmetry."
      },
      {
        "type": "Algorithm steps",
        "front": "Symmetric Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 1 with two children valued 2 and no grandchildren is symmetric.\n\nCompare a pair of mirrored subtrees: values must match, first.left matches second.right, and first.right matches second.left."
      }
    ],
    "testCode": "if (!(new Solution().isSymmetric(new TreeNode(1,new TreeNode(2),new TreeNode(2))))) throw new AssertionError(\"LC 101 failed\");\nif (!(!new Solution().isSymmetric(new TreeNode(1,new TreeNode(2),null)))) throw new AssertionError(\"LC 101 failed\");"
  },
  {
    "id": "lc-102",
    "number": 102,
    "title": "Binary Tree Level Order Traversal",
    "slug": "binary-tree-level-order-traversal",
    "difficulty": "Medium",
    "tags": "Binary tree, Queue",
    "context": "Return lists of node values grouped by depth, with each level ordered from left to right.",
    "examples": "Root 4 with children 2 and 7 yields [[4],[2,7]].",
    "solution": "Breadth-first traversal processes exactly the queue size captured at the start of each level. Newly appended children belong to the next level.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(w), excluding output, w maximum width",
    "pitfall": "Do not use the growing queue size as the level loop bound.",
    "followUp": "Compare BFS memory with DFS grouping by depth on wide and tall trees.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> levelOrder(TreeNode r) {\n        List<List<Integer>> out = new ArrayList<>();\n        if (r == null) return out;\n        Queue<TreeNode> q = new ArrayDeque<>();\n        q.add(r);\n        while (!q.isEmpty()) {\n            int n = q.size();\n            List<Integer> row = new ArrayList<>();\n            while (n-- > 0) {\n                TreeNode x = q.remove();\n                row.add(x.val);\n                if (x.left != null) q.add(x.left);\n                if (x.right != null) q.add(x.right);\n            }\n            out.add(row);\n        }\n        return out;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Level Order Traversal: what invariant makes the approach work?",
        "back": "Breadth-first traversal processes exactly the queue size captured at the start of each level. Newly appended children belong to the next level."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Level Order Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(w), excluding output, w maximum width."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Level Order Traversal: what implementation trap should you check before submitting?",
        "back": "Do not use the growing queue size as the level loop bound."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Level Order Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 4 with children 2 and 7 yields [[4],[2,7]].\n\nBreadth-first traversal processes exactly the queue size captured at the start of each level. Newly appended children belong to the next level."
      }
    ],
    "testCode": "if (!(new Solution().levelOrder(null).isEmpty())) throw new AssertionError(\"LC 102 failed\");\nif (!(new Solution().levelOrder(new TreeNode(4,new TreeNode(2),new TreeNode(7))).equals(List.of(List.of(4),List.of(2,7))))) throw new AssertionError(\"LC 102 failed\");"
  },
  {
    "id": "lc-103",
    "number": 103,
    "title": "Binary Tree Zigzag Level Order Traversal",
    "slug": "binary-tree-zigzag-level-order-traversal",
    "difficulty": "Medium",
    "tags": "Binary tree, Queue",
    "context": "Group nodes by depth, alternating left-to-right and right-to-left output direction at consecutive levels.",
    "examples": "Root 4 with children 2 and 7 yields [[4],[7,2]].",
    "solution": "Use ordinary BFS to preserve child order, but add each level’s values at the deque’s front or back depending on direction. Toggle after each complete level.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(w), excluding output",
    "pitfall": "Reversing both child enqueue order and output direction can cancel the intended zigzag.",
    "followUp": "Produce the same output using two stacks.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> zigzagLevelOrder(TreeNode r) {\n        List<List<Integer>> out = new ArrayList<>();\n        if (r == null) return out;\n        Queue<TreeNode> q = new ArrayDeque<>();\n        q.add(r);\n        boolean forward = true;\n        while (!q.isEmpty()) {\n            int n = q.size();\n            Deque<Integer> row = new ArrayDeque<>();\n            while (n-- > 0) {\n                TreeNode x = q.remove();\n                if (forward) row.addLast(x.val);\n                else row.addFirst(x.val);\n                if (x.left != null) q.add(x.left);\n                if (x.right != null) q.add(x.right);\n            }\n            out.add(new ArrayList<>(row));\n            forward = !forward;\n        }\n        return out;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Zigzag Level Order Traversal: what invariant makes the approach work?",
        "back": "Use ordinary BFS to preserve child order, but add each level’s values at the deque’s front or back depending on direction. Toggle after each complete level."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Zigzag Level Order Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(w), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Zigzag Level Order Traversal: what implementation trap should you check before submitting?",
        "back": "Reversing both child enqueue order and output direction can cancel the intended zigzag."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Zigzag Level Order Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 4 with children 2 and 7 yields [[4],[7,2]].\n\nUse ordinary BFS to preserve child order, but add each level’s values at the deque’s front or back depending on direction. Toggle after each complete level."
      }
    ],
    "testCode": "if (!(new Solution().zigzagLevelOrder(null).isEmpty())) throw new AssertionError(\"LC 103 failed\");\nif (!(new Solution().zigzagLevelOrder(new TreeNode(4,new TreeNode(2),new TreeNode(7))).get(1).equals(List.of(7,2)))) throw new AssertionError(\"LC 103 failed\");"
  },
  {
    "id": "lc-104",
    "number": 104,
    "title": "Maximum Depth of Binary Tree",
    "slug": "maximum-depth-of-binary-tree",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Return the number of nodes on the longest root-to-leaf path. An empty tree has depth zero.",
    "examples": "A root with one leaf child has depth 2.",
    "solution": "An empty subtree contributes zero; a nonempty subtree contributes one plus the larger child depth. This postorder recurrence directly matches the definition.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Depth counts nodes here; do not mix it with an edge-count diameter.",
    "followUp": "Use iterative BFS to avoid stack overflow on a highly skewed tree.",
    "sourceUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxDepth(TreeNode r) {\n        return r == null\n            ? 0\n            : 1 + Math.max(maxDepth(r.left), maxDepth(r.right));\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximum Depth of Binary Tree: what invariant makes the approach work?",
        "back": "An empty subtree contributes zero; a nonempty subtree contributes one plus the larger child depth. This postorder recurrence directly matches the definition."
      },
      {
        "type": "Complexity",
        "front": "Maximum Depth of Binary Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Maximum Depth of Binary Tree: what implementation trap should you check before submitting?",
        "back": "Depth counts nodes here; do not mix it with an edge-count diameter."
      },
      {
        "type": "Algorithm steps",
        "front": "Maximum Depth of Binary Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "A root with one leaf child has depth 2.\n\nAn empty subtree contributes zero; a nonempty subtree contributes one plus the larger child depth. This postorder recurrence directly matches the definition."
      }
    ],
    "testCode": "if (!(new Solution().maxDepth(null)==0)) throw new AssertionError(\"LC 104 failed\");\nif (!(new Solution().maxDepth(new TreeNode(1,new TreeNode(2),null))==2)) throw new AssertionError(\"LC 104 failed\");"
  },
  {
    "id": "lc-105",
    "number": 105,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "difficulty": "Medium",
    "tags": "Binary tree, Hash map",
    "context": "Given consistent preorder and inorder arrays of unique node values, reconstruct the binary tree and return its root.",
    "examples": "preorder=[2,1,3], inorder=[1,2,3] produces root 2 with children 1 and 3.",
    "solution": "The next preorder value is the subtree root. Its inorder position splits left and right ranges; recursively build left first to match preorder consumption.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n), map and recursion",
    "pitfall": "Unique values are required for a value-to-inorder-index map.",
    "followUp": "Explain why preorder plus postorder alone does not always identify a unique tree.",
    "sourceUrl": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    private int p;\n    private Map<Integer, Integer> pos;\n\n    public TreeNode buildTree(int[] pre, int[] in) {\n        p = 0;\n        pos = new HashMap<>();\n        for (int i = 0; i < in.length; i++) pos.put(in[i], i);\n        return build(pre, 0, in.length - 1);\n    }\n\n    TreeNode build(int[] pre, int l, int r) {\n        if (l > r) return null;\n        TreeNode n = new TreeNode(pre[p++]);\n        int m = pos.get(n.val);\n        n.left = build(pre, l, m - 1);\n        n.right = build(pre, m + 1, r);\n        return n;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Construct Binary Tree from Preorder and Inorder Traversal: what invariant makes the approach work?",
        "back": "The next preorder value is the subtree root. Its inorder position splits left and right ranges; recursively build left first to match preorder consumption."
      },
      {
        "type": "Complexity",
        "front": "Construct Binary Tree from Preorder and Inorder Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n), map and recursion."
      },
      {
        "type": "Edge case",
        "front": "Construct Binary Tree from Preorder and Inorder Traversal: what implementation trap should you check before submitting?",
        "back": "Unique values are required for a value-to-inorder-index map."
      },
      {
        "type": "Algorithm steps",
        "front": "Construct Binary Tree from Preorder and Inorder Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "preorder=[2,1,3], inorder=[1,2,3] produces root 2 with children 1 and 3.\n\nThe next preorder value is the subtree root. Its inorder position splits left and right ranges; recursively build left first to match preorder consumption."
      }
    ],
    "testCode": "if (!(new Solution().buildTree(new int[]{2,1,3},new int[]{1,2,3}).right.val==3)) throw new AssertionError(\"LC 105 failed\");\nif (!(new Solution().buildTree(new int[]{7},new int[]{7}).left==null)) throw new AssertionError(\"LC 105 failed\");"
  },
  {
    "id": "lc-106",
    "number": 106,
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "slug": "construct-binary-tree-from-inorder-and-postorder-traversal",
    "difficulty": "Medium",
    "tags": "Binary tree, Hash map",
    "context": "Given consistent inorder and postorder arrays of unique values, reconstruct their binary tree.",
    "examples": "inorder=[1,2,3], postorder=[1,3,2] produces root 2.",
    "solution": "Consume postorder backward: root appears first, followed by right then left subtrees. Use an inorder index map to split subtree ranges.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Build the right subtree before the left when consuming postorder backward.",
    "followUp": "Contrast the consumption order with preorder reconstruction.",
    "sourceUrl": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    private int p;\n    private Map<Integer, Integer> pos;\n\n    public TreeNode buildTree(int[] in, int[] post) {\n        p = post.length - 1;\n        pos = new HashMap<>();\n        for (int i = 0; i < in.length; i++) pos.put(in[i], i);\n        return build(post, 0, in.length - 1);\n    }\n\n    TreeNode build(int[] a, int l, int r) {\n        if (l > r) return null;\n        TreeNode n = new TreeNode(a[p--]);\n        int m = pos.get(n.val);\n        n.right = build(a, m + 1, r);\n        n.left = build(a, l, m - 1);\n        return n;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Construct Binary Tree from Inorder and Postorder Traversal: what invariant makes the approach work?",
        "back": "Consume postorder backward: root appears first, followed by right then left subtrees. Use an inorder index map to split subtree ranges."
      },
      {
        "type": "Complexity",
        "front": "Construct Binary Tree from Inorder and Postorder Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(n)."
      },
      {
        "type": "Edge case",
        "front": "Construct Binary Tree from Inorder and Postorder Traversal: what implementation trap should you check before submitting?",
        "back": "Build the right subtree before the left when consuming postorder backward."
      },
      {
        "type": "Algorithm steps",
        "front": "Construct Binary Tree from Inorder and Postorder Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "inorder=[1,2,3], postorder=[1,3,2] produces root 2.\n\nConsume postorder backward: root appears first, followed by right then left subtrees. Use an inorder index map to split subtree ranges."
      }
    ],
    "testCode": "if (!(new Solution().buildTree(new int[]{1,2,3},new int[]{1,3,2}).left.val==1)) throw new AssertionError(\"LC 106 failed\");\nif (!(new Solution().buildTree(new int[]{7},new int[]{7}).right==null)) throw new AssertionError(\"LC 106 failed\");"
  },
  {
    "id": "lc-108",
    "number": 108,
    "title": "Convert Sorted Array to Binary Search Tree",
    "slug": "convert-sorted-array-to-binary-search-tree",
    "difficulty": "Easy",
    "tags": "Binary tree, BST",
    "context": "Convert a strictly increasing integer array into a height-balanced BST. Any valid balanced shape is accepted.",
    "examples": "[1,3,5] can produce root 3 with children 1 and 5.",
    "solution": "Choose the middle element as root and recursively convert left and right halves. Their sizes differ by at most one, yielding balanced subtree heights.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(log n), excluding output",
    "pitfall": "Pass index ranges instead of copying slices at every level.",
    "followUp": "Compare upper-middle and lower-middle choices for even-length arrays.",
    "sourceUrl": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public TreeNode sortedArrayToBST(int[] a) {\n        return build(a, 0, a.length - 1);\n    }\n\n    TreeNode build(int[] a, int l, int r) {\n        if (l > r) return null;\n        int m = l + (r - l) / 2;\n        return new TreeNode(a[m], build(a, l, m - 1), build(a, m + 1, r));\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Convert Sorted Array to Binary Search Tree: what invariant makes the approach work?",
        "back": "Choose the middle element as root and recursively convert left and right halves. Their sizes differ by at most one, yielding balanced subtree heights."
      },
      {
        "type": "Complexity",
        "front": "Convert Sorted Array to Binary Search Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(log n), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Convert Sorted Array to Binary Search Tree: what implementation trap should you check before submitting?",
        "back": "Pass index ranges instead of copying slices at every level."
      },
      {
        "type": "Algorithm steps",
        "front": "Convert Sorted Array to Binary Search Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "[1,3,5] can produce root 3 with children 1 and 5.\n\nChoose the middle element as root and recursively convert left and right halves. Their sizes differ by at most one, yielding balanced subtree heights."
      }
    ],
    "testCode": "if (!(new Solution().sortedArrayToBST(new int[]{1,3,5}).val==3)) throw new AssertionError(\"LC 108 failed\");\nif (!(new Solution().sortedArrayToBST(new int[]{2}).left==null)) throw new AssertionError(\"LC 108 failed\");"
  },
  {
    "id": "lc-110",
    "number": 110,
    "title": "Balanced Binary Tree",
    "slug": "balanced-binary-tree",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Check whether at every node the left and right subtree heights differ by at most one. Empty trees are balanced.",
    "examples": "A chain of three nodes is unbalanced even though every node has at most two children.",
    "solution": "Compute heights bottom-up, returning -1 as soon as a subtree is unbalanced. Propagate that sentinel so each node is visited at most once.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Recomputing height at each node can degrade to quadratic time.",
    "followUp": "Explain why balancing only the root’s children is insufficient.",
    "sourceUrl": "https://leetcode.com/problems/balanced-binary-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isBalanced(TreeNode r) {\n        return height(r) >= 0;\n    }\n\n    int height(TreeNode r) {\n        if (r == null) return 0;\n        int a = height(r.left);\n        if (a < 0) return -1;\n        int b = height(r.right);\n        if (b < 0 || Math.abs(a - b) > 1) return -1;\n        return 1 + Math.max(a, b);\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Balanced Binary Tree: what invariant makes the approach work?",
        "back": "Compute heights bottom-up, returning -1 as soon as a subtree is unbalanced. Propagate that sentinel so each node is visited at most once."
      },
      {
        "type": "Complexity",
        "front": "Balanced Binary Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Balanced Binary Tree: what implementation trap should you check before submitting?",
        "back": "Recomputing height at each node can degrade to quadratic time."
      },
      {
        "type": "Algorithm steps",
        "front": "Balanced Binary Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "A chain of three nodes is unbalanced even though every node has at most two children.\n\nCompute heights bottom-up, returning -1 as soon as a subtree is unbalanced. Propagate that sentinel so each node is visited at most once."
      }
    ],
    "testCode": "if (!(new Solution().isBalanced(null))) throw new AssertionError(\"LC 110 failed\");\nif (!(!new Solution().isBalanced(new TreeNode(1,new TreeNode(2,new TreeNode(3),null),null)))) throw new AssertionError(\"LC 110 failed\");"
  },
  {
    "id": "lc-111",
    "number": 111,
    "title": "Minimum Depth of Binary Tree",
    "slug": "minimum-depth-of-binary-tree",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Return the number of nodes in the shortest root-to-leaf path. A leaf has no children; an absent child is not a leaf.",
    "examples": "A root with only one child has minimum depth 2, not 1.",
    "solution": "If one child is missing, follow the existing child. Otherwise take one plus the smaller depth; empty input itself has depth zero.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Taking min(leftDepth,rightDepth) blindly treats a missing child as a completed path.",
    "followUp": "Use BFS and stop at the first actual leaf.",
    "sourceUrl": "https://leetcode.com/problems/minimum-depth-of-binary-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minDepth(TreeNode r) {\n        if (r == null) return 0;\n        if (r.left == null) return 1 + minDepth(r.right);\n        if (r.right == null) return 1 + minDepth(r.left);\n        return 1 + Math.min(minDepth(r.left), minDepth(r.right));\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Depth of Binary Tree: what invariant makes the approach work?",
        "back": "If one child is missing, follow the existing child. Otherwise take one plus the smaller depth; empty input itself has depth zero."
      },
      {
        "type": "Complexity",
        "front": "Minimum Depth of Binary Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Minimum Depth of Binary Tree: what implementation trap should you check before submitting?",
        "back": "Taking min(leftDepth,rightDepth) blindly treats a missing child as a completed path."
      },
      {
        "type": "Algorithm steps",
        "front": "Minimum Depth of Binary Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "A root with only one child has minimum depth 2, not 1.\n\nIf one child is missing, follow the existing child. Otherwise take one plus the smaller depth; empty input itself has depth zero."
      }
    ],
    "testCode": "if (!(new Solution().minDepth(null)==0)) throw new AssertionError(\"LC 111 failed\");\nif (!(new Solution().minDepth(new TreeNode(1,null,new TreeNode(2)))==2)) throw new AssertionError(\"LC 111 failed\");"
  },
  {
    "id": "lc-112",
    "number": 112,
    "title": "Path Sum",
    "slug": "path-sum",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Determine whether some root-to-leaf path has values summing to targetSum. Values may be negative and empty input has no path.",
    "examples": "Root 3 with leaf child -1 has a path summing to 2.",
    "solution": "Subtract each visited node from the remaining target. Accept only at a leaf when the remaining target equals the leaf value; recurse into either child otherwise.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "A zero remainder at a non-leaf is not a complete path; negative values prevent simple positive-sum pruning.",
    "followUp": "Extend the recurrence to count all matching root-to-leaf paths.",
    "sourceUrl": "https://leetcode.com/problems/path-sum/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean hasPathSum(TreeNode r, int t) {\n        if (r == null) return false;\n        if (r.left == null && r.right == null) return r.val == t;\n        return hasPathSum(r.left, t - r.val) || hasPathSum(r.right, t - r.val);\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Path Sum: what invariant makes the approach work?",
        "back": "Subtract each visited node from the remaining target. Accept only at a leaf when the remaining target equals the leaf value; recurse into either child otherwise."
      },
      {
        "type": "Complexity",
        "front": "Path Sum: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Path Sum: what implementation trap should you check before submitting?",
        "back": "A zero remainder at a non-leaf is not a complete path; negative values prevent simple positive-sum pruning."
      },
      {
        "type": "Algorithm steps",
        "front": "Path Sum: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 3 with leaf child -1 has a path summing to 2.\n\nSubtract each visited node from the remaining target. Accept only at a leaf when the remaining target equals the leaf value; recurse into either child otherwise."
      }
    ],
    "testCode": "if (!(new Solution().hasPathSum(new TreeNode(3,new TreeNode(-1),null),2))) throw new AssertionError(\"LC 112 failed\");\nif (!(!new Solution().hasPathSum(null,0))) throw new AssertionError(\"LC 112 failed\");"
  },
  {
    "id": "lc-113",
    "number": 113,
    "title": "Path Sum II",
    "slug": "path-sum-ii",
    "difficulty": "Medium",
    "tags": "Binary tree",
    "context": "Return every root-to-leaf value sequence whose sum equals targetSum. Values can be negative; each returned path must own its list of values.",
    "examples": "Root 2 with two leaf children 1 yields two paths [2,1] when target is 3.",
    "solution": "Maintain the current path during DFS, subtracting visited values. Copy it at a matching leaf, then remove the last element while unwinding to restore sibling state.",
    "timeComplexity": "O(n + total returned path lengths)",
    "spaceComplexity": "O(h), excluding output",
    "pitfall": "Adding the mutable current path directly makes all results share later mutations.",
    "followUp": "How would the method change to return node references rather than values?",
    "sourceUrl": "https://leetcode.com/problems/path-sum-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> pathSum(TreeNode r, int t) {\n        List<List<Integer>> out = new ArrayList<>();\n        walk(r, t, new ArrayList<>(), out);\n        return out;\n    }\n\n    void walk(TreeNode r, int t, List<Integer> p, List<List<Integer>> out) {\n        if (r == null) return;\n        p.add(r.val);\n        if (r.left == null && r.right == null && t == r.val) out.add(\n            new ArrayList<>(p)\n        );\n        walk(r.left, t - r.val, p, out);\n        walk(r.right, t - r.val, p, out);\n        p.remove(p.size() - 1);\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Path Sum II: what invariant makes the approach work?",
        "back": "Maintain the current path during DFS, subtracting visited values. Copy it at a matching leaf, then remove the last element while unwinding to restore sibling state."
      },
      {
        "type": "Complexity",
        "front": "Path Sum II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n + total returned path lengths). Auxiliary space: O(h), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Path Sum II: what implementation trap should you check before submitting?",
        "back": "Adding the mutable current path directly makes all results share later mutations."
      },
      {
        "type": "Algorithm steps",
        "front": "Path Sum II: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 2 with two leaf children 1 yields two paths [2,1] when target is 3.\n\nMaintain the current path during DFS, subtracting visited values. Copy it at a matching leaf, then remove the last element while unwinding to restore sibling state."
      }
    ],
    "testCode": "if (!(new Solution().pathSum(new TreeNode(2,new TreeNode(1),new TreeNode(1)),3).size()==2)) throw new AssertionError(\"LC 113 failed\");\nif (!(new Solution().pathSum(null,0).isEmpty())) throw new AssertionError(\"LC 113 failed\");"
  },
  {
    "id": "lc-114",
    "number": 114,
    "title": "Flatten Binary Tree to Linked List",
    "slug": "flatten-binary-tree-to-linked-list",
    "difficulty": "Medium",
    "tags": "Binary tree",
    "context": "Rewire a binary tree in-place into its preorder sequence using right pointers only; all left pointers must become null.",
    "examples": "Root 1 with children 2 and 3 becomes 1→2→3 along right links.",
    "solution": "If a left subtree exists, attach the old right subtree to its rightmost node, move the left subtree to the right, and clear left. Then continue down the right chain.",
    "timeComplexity": "O(n) amortized pointer scanning",
    "spaceComplexity": "O(1)",
    "pitfall": "Attach the old right subtree before overwriting root.right.",
    "followUp": "Compare this pointer-splicing method with reverse-preorder recursion.",
    "sourceUrl": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void flatten(TreeNode r) {\n        while (r != null) {\n            if (r.left != null) {\n                TreeNode p = r.left;\n                while (p.right != null) p = p.right;\n                p.right = r.right;\n                r.right = r.left;\n                r.left = null;\n            }\n            r = r.right;\n        }\n    }\n\n    public boolean check(boolean child) {\n        TreeNode r = new TreeNode(\n            1,\n            child ? new TreeNode(2) : null,\n            new TreeNode(3)\n        );\n        flatten(r);\n        return (\n            r.left == null &&\n            r.right.val == (child ? 2 : 3) &&\n            (!child || r.right.right.val == 3)\n        );\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Flatten Binary Tree to Linked List: what invariant makes the approach work?",
        "back": "If a left subtree exists, attach the old right subtree to its rightmost node, move the left subtree to the right, and clear left. Then continue down the right chain."
      },
      {
        "type": "Complexity",
        "front": "Flatten Binary Tree to Linked List: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n) amortized pointer scanning. Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Flatten Binary Tree to Linked List: what implementation trap should you check before submitting?",
        "back": "Attach the old right subtree before overwriting root.right."
      },
      {
        "type": "Algorithm steps",
        "front": "Flatten Binary Tree to Linked List: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 1 with children 2 and 3 becomes 1→2→3 along right links.\n\nIf a left subtree exists, attach the old right subtree to its rightmost node, move the left subtree to the right, and clear left. Then continue down the right chain."
      }
    ],
    "testCode": "if (!(new Solution().check(true))) throw new AssertionError(\"LC 114 failed\");\nif (!(new Solution().check(false))) throw new AssertionError(\"LC 114 failed\");"
  },
  {
    "id": "lc-116",
    "number": 116,
    "title": "Populating Next Right Pointers in Each Node",
    "slug": "populating-next-right-pointers-in-each-node",
    "difficulty": "Medium",
    "tags": "Binary tree",
    "context": "In a perfect binary tree, fill each node’s next pointer with its same-level neighbor to the right, or null at the end. Initially next pointers are null.",
    "examples": "The left child of a parent connects to its sibling; the right child connects to the next parent’s left child.",
    "solution": "Walk a level using already-established next links. Connect each sibling pair, then bridge adjacent parents. Descend through the leftmost node.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The perfect-tree guarantee is necessary for unconditional child connections.",
    "followUp": "Generalize the technique to a sparse binary tree using a dummy next-level head.",
    "sourceUrl": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public Node connect(Node root) {\n        Node level = root;\n        while (level != null && level.left != null) {\n            for (Node p = level; p != null; p = p.next) {\n                p.left.next = p.right;\n                p.right.next = p.next == null ? null : p.next.left;\n            }\n            level = level.left;\n        }\n        return root;\n    }\n\n    public boolean check() {\n        Node r = new Node(1);\n        r.left = new Node(2);\n        r.right = new Node(3);\n        connect(r);\n        return r.left.next == r.right && r.right.next == null;\n    }\n}\n\nclass Node {\n\n    int val;\n    Node left, right, next;\n\n    Node(int v) {\n        val = v;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Populating Next Right Pointers in Each Node: what invariant makes the approach work?",
        "back": "Walk a level using already-established next links. Connect each sibling pair, then bridge adjacent parents. Descend through the leftmost node."
      },
      {
        "type": "Complexity",
        "front": "Populating Next Right Pointers in Each Node: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1)."
      },
      {
        "type": "Edge case",
        "front": "Populating Next Right Pointers in Each Node: what implementation trap should you check before submitting?",
        "back": "The perfect-tree guarantee is necessary for unconditional child connections."
      },
      {
        "type": "Algorithm steps",
        "front": "Populating Next Right Pointers in Each Node: trace the algorithm on a small example, including its intermediate state.",
        "back": "The left child of a parent connects to its sibling; the right child connects to the next parent’s left child.\n\nWalk a level using already-established next links. Connect each sibling pair, then bridge adjacent parents. Descend through the leftmost node."
      }
    ],
    "testCode": "if (!(new Solution().connect(null)==null)) throw new AssertionError(\"LC 116 failed\");\nif (!(new Solution().check())) throw new AssertionError(\"LC 116 failed\");"
  },
  {
    "id": "lc-117",
    "number": 117,
    "title": "Populating Next Right Pointers in Each Node II",
    "slug": "populating-next-right-pointers-in-each-node-ii",
    "difficulty": "Medium",
    "tags": "Binary tree",
    "context": "Fill same-level next pointers in an arbitrary binary tree, leaving the last node on each level pointing to null. Initial next pointers are null.",
    "examples": "A left-only child of one parent can link to a right-only child of the next parent.",
    "solution": "Traverse the current level via next pointers and append each existing child to a dummy-headed next-level chain. Move to dummy.next after completing the level.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) live auxiliary space",
    "pitfall": "Skip absent children instead of assuming a perfect tree.",
    "followUp": "Explain why next links can replace the BFS queue.",
    "sourceUrl": "https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public Node connect(Node root) {\n        Node level = root;\n        while (level != null) {\n            Node d = new Node(0),\n                t = d;\n            for (Node p = level; p != null; p = p.next) {\n                if (p.left != null) {\n                    t.next = p.left;\n                    t = t.next;\n                }\n                if (p.right != null) {\n                    t.next = p.right;\n                    t = t.next;\n                }\n            }\n            t.next = null;\n            level = d.next;\n        }\n        return root;\n    }\n\n    public boolean check() {\n        Node r = new Node(1);\n        r.left = new Node(2);\n        r.right = new Node(3);\n        r.left.right = new Node(4);\n        r.right.left = new Node(5);\n        connect(r);\n        return r.left.next == r.right && r.left.right.next == r.right.left;\n    }\n}\n\nclass Node {\n\n    int val;\n    Node left, right, next;\n\n    Node(int v) {\n        val = v;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Populating Next Right Pointers in Each Node II: what invariant makes the approach work?",
        "back": "Traverse the current level via next pointers and append each existing child to a dummy-headed next-level chain. Move to dummy.next after completing the level."
      },
      {
        "type": "Complexity",
        "front": "Populating Next Right Pointers in Each Node II: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(1) live auxiliary space."
      },
      {
        "type": "Edge case",
        "front": "Populating Next Right Pointers in Each Node II: what implementation trap should you check before submitting?",
        "back": "Skip absent children instead of assuming a perfect tree."
      },
      {
        "type": "Algorithm steps",
        "front": "Populating Next Right Pointers in Each Node II: trace the algorithm on a small example, including its intermediate state.",
        "back": "A left-only child of one parent can link to a right-only child of the next parent.\n\nTraverse the current level via next pointers and append each existing child to a dummy-headed next-level chain. Move to dummy.next after completing the level."
      }
    ],
    "testCode": "if (!(new Solution().connect(null)==null)) throw new AssertionError(\"LC 117 failed\");\nif (!(new Solution().check())) throw new AssertionError(\"LC 117 failed\");"
  },
  {
    "id": "lc-124",
    "number": 124,
    "title": "Binary Tree Maximum Path Sum",
    "slug": "binary-tree-maximum-path-sum",
    "difficulty": "Hard",
    "tags": "Binary tree",
    "context": "Find the largest value sum along any nonempty simple path in a nonempty binary tree. A path can start and end anywhere and need not include the root.",
    "examples": "Root -2 with children 4 and 5 has best path 4→-2→5, sum 7.",
    "solution": "Return the best one-branch gain to each parent. At each node consider a complete path using both nonnegative child gains; update a global maximum before returning only one branch.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Initialize the answer below all node values so an all-negative tree returns its best node, not zero.",
    "followUp": "Explain why returning both branches to a parent would form an invalid branching path.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    private int best;\n\n    public int maxPathSum(TreeNode r) {\n        best = Integer.MIN_VALUE;\n        gain(r);\n        return best;\n    }\n\n    int gain(TreeNode n) {\n        if (n == null) return 0;\n        int a = Math.max(0, gain(n.left)),\n            b = Math.max(0, gain(n.right));\n        best = Math.max(best, n.val + a + b);\n        return n.val + Math.max(a, b);\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Maximum Path Sum: what invariant makes the approach work?",
        "back": "Return the best one-branch gain to each parent. At each node consider a complete path using both nonnegative child gains; update a global maximum before returning only one branch."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Maximum Path Sum: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Maximum Path Sum: what implementation trap should you check before submitting?",
        "back": "Initialize the answer below all node values so an all-negative tree returns its best node, not zero."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Maximum Path Sum: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root -2 with children 4 and 5 has best path 4→-2→5, sum 7.\n\nReturn the best one-branch gain to each parent. At each node consider a complete path using both nonnegative child gains; update a global maximum before returning only one branch."
      }
    ],
    "testCode": "if (!(new Solution().maxPathSum(new TreeNode(-2,new TreeNode(4),new TreeNode(5)))==7)) throw new AssertionError(\"LC 124 failed\");\nif (!(new Solution().maxPathSum(new TreeNode(-7))==-7)) throw new AssertionError(\"LC 124 failed\");"
  },
  {
    "id": "lc-144",
    "number": 144,
    "title": "Binary Tree Preorder Traversal",
    "slug": "binary-tree-preorder-traversal",
    "difficulty": "Easy",
    "tags": "Binary tree, Stack",
    "context": "Return binary-tree values in root, left-subtree, right-subtree order. Empty input returns an empty list.",
    "examples": "Root 2 with children 1 and 3 yields [2,1,3].",
    "solution": "Pop and visit a node, then push right before left. Because the stack is LIFO, the left subtree is processed completely before the right.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h), excluding output",
    "pitfall": "Pushing left before right reverses the intended subtree order.",
    "followUp": "Describe how preorder supports serializing a tree when null markers are added.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> preorderTraversal(TreeNode r) {\n        List<Integer> out = new ArrayList<>();\n        if (r == null) return out;\n        Deque<TreeNode> s = new ArrayDeque<>();\n        s.push(r);\n        while (!s.isEmpty()) {\n            TreeNode n = s.pop();\n            out.add(n.val);\n            if (n.right != null) s.push(n.right);\n            if (n.left != null) s.push(n.left);\n        }\n        return out;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Preorder Traversal: what invariant makes the approach work?",
        "back": "Pop and visit a node, then push right before left. Because the stack is LIFO, the left subtree is processed completely before the right."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Preorder Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Preorder Traversal: what implementation trap should you check before submitting?",
        "back": "Pushing left before right reverses the intended subtree order."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Preorder Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 2 with children 1 and 3 yields [2,1,3].\n\nPop and visit a node, then push right before left. Because the stack is LIFO, the left subtree is processed completely before the right."
      }
    ],
    "testCode": "if (!(new Solution().preorderTraversal(null).isEmpty())) throw new AssertionError(\"LC 144 failed\");\nif (!(new Solution().preorderTraversal(new TreeNode(2,new TreeNode(1),new TreeNode(3))).equals(List.of(2,1,3)))) throw new AssertionError(\"LC 144 failed\");"
  },
  {
    "id": "lc-145",
    "number": 145,
    "title": "Binary Tree Postorder Traversal",
    "slug": "binary-tree-postorder-traversal",
    "difficulty": "Easy",
    "tags": "Binary tree, Stack",
    "context": "Return node values in left-subtree, right-subtree, root order. Empty input yields an empty list.",
    "examples": "Root 2 with children 1 and 3 yields [1,3,2].",
    "solution": "Traverse root-right-left using a stack and prepend every visited value. Reversing that visitation order gives left-right-root.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h) stack, excluding output",
    "pitfall": "Push left before right so right is processed first in the reversed traversal.",
    "followUp": "Implement postorder with one stack and a last-visited pointer without prepending.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> postorderTraversal(TreeNode r) {\n        LinkedList<Integer> out = new LinkedList<>();\n        if (r == null) return out;\n        Deque<TreeNode> s = new ArrayDeque<>();\n        s.push(r);\n        while (!s.isEmpty()) {\n            TreeNode n = s.pop();\n            out.addFirst(n.val);\n            if (n.left != null) s.push(n.left);\n            if (n.right != null) s.push(n.right);\n        }\n        return out;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Postorder Traversal: what invariant makes the approach work?",
        "back": "Traverse root-right-left using a stack and prepend every visited value. Reversing that visitation order gives left-right-root."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Postorder Traversal: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h) stack, excluding output."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Postorder Traversal: what implementation trap should you check before submitting?",
        "back": "Push left before right so right is processed first in the reversed traversal."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Postorder Traversal: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 2 with children 1 and 3 yields [1,3,2].\n\nTraverse root-right-left using a stack and prepend every visited value. Reversing that visitation order gives left-right-root."
      }
    ],
    "testCode": "if (!(new Solution().postorderTraversal(null).isEmpty())) throw new AssertionError(\"LC 145 failed\");\nif (!(new Solution().postorderTraversal(new TreeNode(2,new TreeNode(1),new TreeNode(3))).equals(List.of(1,3,2)))) throw new AssertionError(\"LC 145 failed\");"
  },
  {
    "id": "lc-199",
    "number": 199,
    "title": "Binary Tree Right Side View",
    "slug": "binary-tree-right-side-view",
    "difficulty": "Medium",
    "tags": "Binary tree, Queue",
    "context": "Return the values visible from the right side, one per depth from top to bottom. A deep left subtree can be visible below a shorter right subtree.",
    "examples": "Root 1 with left child 2 whose left child is 4, and right child 3, yields [1,3,4].",
    "solution": "Run BFS left-to-right and record only the final node in each level. That node has no same-depth node to its right.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(w), excluding output",
    "pitfall": "Following only right pointers misses visible nodes in deeper left subtrees.",
    "followUp": "Use right-first DFS and record the first node seen at each depth.",
    "sourceUrl": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<Integer> rightSideView(TreeNode r) {\n        List<Integer> out = new ArrayList<>();\n        if (r == null) return out;\n        Queue<TreeNode> q = new ArrayDeque<>();\n        q.add(r);\n        while (!q.isEmpty()) {\n            int n = q.size();\n            for (int i = 0; i < n; i++) {\n                TreeNode x = q.remove();\n                if (i == n - 1) out.add(x.val);\n                if (x.left != null) q.add(x.left);\n                if (x.right != null) q.add(x.right);\n            }\n        }\n        return out;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Binary Tree Right Side View: what invariant makes the approach work?",
        "back": "Run BFS left-to-right and record only the final node in each level. That node has no same-depth node to its right."
      },
      {
        "type": "Complexity",
        "front": "Binary Tree Right Side View: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(w), excluding output."
      },
      {
        "type": "Edge case",
        "front": "Binary Tree Right Side View: what implementation trap should you check before submitting?",
        "back": "Following only right pointers misses visible nodes in deeper left subtrees."
      },
      {
        "type": "Algorithm steps",
        "front": "Binary Tree Right Side View: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 1 with left child 2 whose left child is 4, and right child 3, yields [1,3,4].\n\nRun BFS left-to-right and record only the final node in each level. That node has no same-depth node to its right."
      }
    ],
    "testCode": "if (!(new Solution().rightSideView(null).isEmpty())) throw new AssertionError(\"LC 199 failed\");\nif (!(new Solution().rightSideView(new TreeNode(1,new TreeNode(2,new TreeNode(4),null),new TreeNode(3))).equals(List.of(1,3,4)))) throw new AssertionError(\"LC 199 failed\");"
  },
  {
    "id": "lc-208",
    "number": 208,
    "title": "Implement Trie (Prefix Tree)",
    "slug": "implement-trie-prefix-tree",
    "difficulty": "Medium",
    "tags": "Trie, Design",
    "context": "Store lowercase words and support exact-word search and prefix search. Inserting a word does not automatically insert all its prefixes as complete words.",
    "examples": "Insert \"code\": search(\"co\") is false, startsWith(\"co\") is true.",
    "solution": "Each edge represents a character and each node a prefix. A terminal marker distinguishes a stored word from a mere path through longer words.",
    "timeComplexity": "O(L) per insert/search/prefix query",
    "spaceComplexity": "O(total inserted characters × alphabet), alphabet fixed at 26",
    "pitfall": "Exact search must check the terminal marker after traversing all characters.",
    "followUp": "Compare fixed child arrays with maps for sparse or Unicode alphabets.",
    "sourceUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "code": "import java.util.*;\n\nclass Trie {\n\n    private static class N {\n\n        N[] c = new N[26];\n        boolean end;\n    }\n\n    private N root = new N();\n\n    public Trie() {}\n\n    public void insert(String w) {\n        N p = root;\n        for (char c : w.toCharArray()) {\n            int i = c - 'a';\n            if (p.c[i] == null) p.c[i] = new N();\n            p = p.c[i];\n        }\n        p.end = true;\n    }\n\n    private N find(String w) {\n        N p = root;\n        for (char c : w.toCharArray()) {\n            p = p.c[c - 'a'];\n            if (p == null) return null;\n        }\n        return p;\n    }\n\n    public boolean search(String w) {\n        N p = find(w);\n        return p != null && p.end;\n    }\n\n    public boolean startsWith(String p) {\n        return find(p) != null;\n    }\n\n    public static boolean check() {\n        Trie t = new Trie();\n        t.insert(\"code\");\n        return t.search(\"code\") && !t.search(\"co\") && t.startsWith(\"co\");\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Implement Trie (Prefix Tree): what invariant makes the approach work?",
        "back": "Each edge represents a character and each node a prefix. A terminal marker distinguishes a stored word from a mere path through longer words."
      },
      {
        "type": "Complexity",
        "front": "Implement Trie (Prefix Tree): give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(L) per insert/search/prefix query. Auxiliary space: O(total inserted characters × alphabet), alphabet fixed at 26."
      },
      {
        "type": "Edge case",
        "front": "Implement Trie (Prefix Tree): what implementation trap should you check before submitting?",
        "back": "Exact search must check the terminal marker after traversing all characters."
      },
      {
        "type": "Algorithm steps",
        "front": "Implement Trie (Prefix Tree): trace the algorithm on a small example, including its intermediate state.",
        "back": "Insert \"code\": search(\"co\") is false, startsWith(\"co\") is true.\n\nEach edge represents a character and each node a prefix. A terminal marker distinguishes a stored word from a mere path through longer words."
      }
    ],
    "testCode": "if (!(Trie.check())) throw new AssertionError(\"LC 208 failed\");\nif (!(!new Trie().startsWith(\"a\"))) throw new AssertionError(\"LC 208 failed\");"
  },
  {
    "id": "lc-211",
    "number": 211,
    "title": "Design Add and Search Words Data Structure",
    "slug": "design-add-and-search-words-data-structure",
    "difficulty": "Medium",
    "tags": "Trie, Design",
    "context": "Store lowercase words and search patterns where a dot matches any single letter. Pattern length must match the stored word length.",
    "examples": "After adding \"cat\", search(\"c.t\") is true and search(\"c.\") is false.",
    "solution": "Use a trie for insertion. Literal search characters follow one edge; a dot recursively tries each existing child, accepting only a terminal node at pattern end.",
    "timeComplexity": "O(L) insertion; O(26^d × L) search upper bound for d dots, bounded by visited trie nodes",
    "spaceComplexity": "O(total inserted characters); O(L) search recursion",
    "pitfall": "A dot consumes exactly one character, not an arbitrary-length suffix.",
    "followUp": "How would supporting a star wildcard change state and memoization?",
    "sourceUrl": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "code": "import java.util.*;\n\nclass WordDictionary {\n\n    private static class N {\n\n        N[] c = new N[26];\n        boolean end;\n    }\n\n    private N root = new N();\n\n    public WordDictionary() {}\n\n    public void addWord(String w) {\n        N p = root;\n        for (char c : w.toCharArray()) {\n            int i = c - 'a';\n            if (p.c[i] == null) p.c[i] = new N();\n            p = p.c[i];\n        }\n        p.end = true;\n    }\n\n    public boolean search(String w) {\n        return match(root, w, 0);\n    }\n\n    boolean match(N p, String w, int i) {\n        if (p == null) return false;\n        if (i == w.length()) return p.end;\n        char c = w.charAt(i);\n        if (c != '.') return match(p.c[c - 'a'], w, i + 1);\n        for (N n : p.c) if (n != null && match(n, w, i + 1)) return true;\n        return false;\n    }\n\n    public static boolean check() {\n        WordDictionary w = new WordDictionary();\n        w.addWord(\"cat\");\n        return w.search(\"c.t\") && !w.search(\"c.\");\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Design Add and Search Words Data Structure: what invariant makes the approach work?",
        "back": "Use a trie for insertion. Literal search characters follow one edge; a dot recursively tries each existing child, accepting only a terminal node at pattern end."
      },
      {
        "type": "Complexity",
        "front": "Design Add and Search Words Data Structure: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(L) insertion; O(26^d × L) search upper bound for d dots, bounded by visited trie nodes. Auxiliary space: O(total inserted characters); O(L) search recursion."
      },
      {
        "type": "Edge case",
        "front": "Design Add and Search Words Data Structure: what implementation trap should you check before submitting?",
        "back": "A dot consumes exactly one character, not an arbitrary-length suffix."
      },
      {
        "type": "Algorithm steps",
        "front": "Design Add and Search Words Data Structure: trace the algorithm on a small example, including its intermediate state.",
        "back": "After adding \"cat\", search(\"c.t\") is true and search(\"c.\") is false.\n\nUse a trie for insertion. Literal search characters follow one edge; a dot recursively tries each existing child, accepting only a terminal node at pattern end."
      }
    ],
    "testCode": "if (!(WordDictionary.check())) throw new AssertionError(\"LC 211 failed\");\nif (!(!new WordDictionary().search(\".\"))) throw new AssertionError(\"LC 211 failed\");"
  },
  {
    "id": "lc-226",
    "number": 226,
    "title": "Invert Binary Tree",
    "slug": "invert-binary-tree",
    "difficulty": "Easy",
    "tags": "Binary tree",
    "context": "Mirror a binary tree by swapping left and right children at every node, returning the same root object.",
    "examples": "Root 2 with children 1 and 3 becomes root 2 with left 3 and right 1.",
    "solution": "Recursively mirror both original subtrees, then exchange their positions. Every node’s local swap composes into a full-tree reflection.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(h)",
    "pitfall": "Store one subtree result before overwriting its original pointer.",
    "followUp": "Show that applying inversion twice restores the original tree.",
    "sourceUrl": "https://leetcode.com/problems/invert-binary-tree/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public TreeNode invertTree(TreeNode r) {\n        if (r == null) return null;\n        TreeNode left = invertTree(r.left);\n        r.left = invertTree(r.right);\n        r.right = left;\n        return r;\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Invert Binary Tree: what invariant makes the approach work?",
        "back": "Recursively mirror both original subtrees, then exchange their positions. Every node’s local swap composes into a full-tree reflection."
      },
      {
        "type": "Complexity",
        "front": "Invert Binary Tree: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(n). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Invert Binary Tree: what implementation trap should you check before submitting?",
        "back": "Store one subtree result before overwriting its original pointer."
      },
      {
        "type": "Algorithm steps",
        "front": "Invert Binary Tree: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 2 with children 1 and 3 becomes root 2 with left 3 and right 1.\n\nRecursively mirror both original subtrees, then exchange their positions. Every node’s local swap composes into a full-tree reflection."
      }
    ],
    "testCode": "if (!(new Solution().invertTree(null)==null)) throw new AssertionError(\"LC 226 failed\");\nif (!(new Solution().invertTree(new TreeNode(2,new TreeNode(1),new TreeNode(3))).left.val==3)) throw new AssertionError(\"LC 226 failed\");"
  },
  {
    "id": "lc-230",
    "number": 230,
    "title": "Kth Smallest Element in a BST",
    "slug": "kth-smallest-element-in-a-bst",
    "difficulty": "Medium",
    "tags": "Binary tree, BST, Stack",
    "context": "Given a BST with distinct keys and valid positive k, return its kth smallest value.",
    "examples": "Root 3 with left 1 and right 5, k=2 returns 3.",
    "solution": "Iterative inorder traversal emits keys in sorted order. Count popped nodes and stop immediately at the kth visit.",
    "timeComplexity": "O(h+k)",
    "spaceComplexity": "O(h)",
    "pitfall": "The BST ordering guarantee is essential; arbitrary inorder is not sorted.",
    "followUp": "Augment nodes with subtree sizes to support repeated rank queries and updates.",
    "sourceUrl": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int kthSmallest(TreeNode r, int k) {\n        Deque<TreeNode> s = new ArrayDeque<>();\n        while (r != null || !s.isEmpty()) {\n            while (r != null) {\n                s.push(r);\n                r = r.left;\n            }\n            r = s.pop();\n            if (--k == 0) return r.val;\n            r = r.right;\n        }\n        throw new IllegalArgumentException(\"invalid k\");\n    }\n}\n\nclass TreeNode {\n\n    int val;\n    TreeNode left, right;\n\n    TreeNode(int v) {\n        val = v;\n    }\n\n    TreeNode(int v, TreeNode l, TreeNode r) {\n        val = v;\n        left = l;\n        right = r;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Kth Smallest Element in a BST: what invariant makes the approach work?",
        "back": "Iterative inorder traversal emits keys in sorted order. Count popped nodes and stop immediately at the kth visit."
      },
      {
        "type": "Complexity",
        "front": "Kth Smallest Element in a BST: give time and auxiliary space bounds, and explain what grows.",
        "back": "Time: O(h+k). Auxiliary space: O(h)."
      },
      {
        "type": "Edge case",
        "front": "Kth Smallest Element in a BST: what implementation trap should you check before submitting?",
        "back": "The BST ordering guarantee is essential; arbitrary inorder is not sorted."
      },
      {
        "type": "Algorithm steps",
        "front": "Kth Smallest Element in a BST: trace the algorithm on a small example, including its intermediate state.",
        "back": "Root 3 with left 1 and right 5, k=2 returns 3.\n\nIterative inorder traversal emits keys in sorted order. Count popped nodes and stop immediately at the kth visit."
      }
    ],
    "testCode": "if (!(new Solution().kthSmallest(new TreeNode(3,new TreeNode(1),new TreeNode(5)),2)==3)) throw new AssertionError(\"LC 230 failed\");\nif (!(new Solution().kthSmallest(new TreeNode(-1),1)==-1)) throw new AssertionError(\"LC 230 failed\");"
  }
];
