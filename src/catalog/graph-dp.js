// Original curated study guides; source provenance is in docs/research-graph-dp.md
export default [
  {
    "id": "lc-200",
    "number": 200,
    "title": "Number of Islands",
    "slug": "number-of-islands",
    "difficulty": "Medium",
    "tags": "Graph, BFS, Grid",
    "context": "Given a nonempty rectangular grid of land (1) and water (0), return the number of land components using four-direction adjacency. Diagonals do not connect land. This implementation consumes land cells.",
    "examples": "[[1,0],[0,1]] => 2: the two diagonal cells start separate floods.",
    "solution": "Start a flood at each unseen land cell and increment the count. Mark when enqueuing: every land cell enters the queue once, and one flood visits exactly one connected component.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols) queue",
    "pitfall": "Mark on enqueue, not on dequeue; otherwise neighbors can enqueue the same cell repeatedly.",
    "followUp": "How would you preserve the input or support land additions online?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numIslands(char[][] g) {\n        int m = g.length,\n            n = g[0].length,\n            ans = 0;\n        int[] d = { 1, 0, -1, 0, 1 };\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (\n            g[r][c] == '1'\n        ) {\n            ans++;\n            Queue<Integer> q = new ArrayDeque<>();\n            q.add(r * n + c);\n            g[r][c] = '0';\n            while (!q.isEmpty()) {\n                int v = q.remove(),\n                    x = v / n,\n                    y = v % n;\n                for (int k = 0; k < 4; k++) {\n                    int a = x + d[k],\n                        b = y + d[k + 1];\n                    if (a >= 0 && a < m && b >= 0 && b < n && g[a][b] == '1') {\n                        g[a][b] = '0';\n                        q.add(a * n + b);\n                    }\n                }\n            }\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Number of Islands: what state or invariant makes the solution work?",
        "back": "Start a flood at each unseen land cell and increment the count. Mark when enqueuing: every land cell enters the queue once, and one flood visits exactly one connected component."
      },
      {
        "type": "Edge case",
        "front": "Number of Islands: what implementation trap should you check before submitting?",
        "back": "Mark on enqueue, not on dequeue; otherwise neighbors can enqueue the same cell repeatedly."
      },
      {
        "type": "Complexity",
        "front": "Number of Islands: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols) queue. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Number of Islands: trace this case without running code: [[1,0],[0,1]] ",
        "back": "[[1,0],[0,1]] => 2: the two diagonal cells start separate floods."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.numIslands(new char[][]{{'1','0'},{'0','1'}})!=2)throw new AssertionError(); if(s.numIslands(new char[][]{{'0'}})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/number-of-islands/"
  },
  {
    "id": "lc-133",
    "number": 133,
    "title": "Clone Graph",
    "slug": "clone-graph",
    "difficulty": "Medium",
    "tags": "Graph, DFS, Identity map",
    "context": "Given a node in an undirected connected graph, return a deep copy preserving values and neighbor relationships. Null denotes an empty graph. Copied nodes must not reuse original objects.",
    "examples": "Two nodes 7--9 => two new objects with the same mutual edge; null => null.",
    "solution": "Map each original node identity to its clone before exploring neighbors. A repeated encounter returns the already allocated clone, preserving cycles and shared references.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V) map and recursion, plus O(V + E) output",
    "pitfall": "Register the clone before recursion; registering afterward loops forever on a cycle.",
    "followUp": "Replace recursion with BFS and explain how you would test object independence.",
    "code": "import java.util.*;\n\nclass Node {\n\n    public int val;\n    public List<Node> neighbors;\n\n    public Node() {\n        this(0);\n    }\n\n    public Node(int v) {\n        val = v;\n        neighbors = new ArrayList<>();\n    }\n\n    public Node(int v, ArrayList<Node> n) {\n        val = v;\n        neighbors = n;\n    }\n}\n\nclass Solution {\n\n    public Node cloneGraph(Node node) {\n        return copy(node, new IdentityHashMap<>());\n    }\n\n    private Node copy(Node n, Map<Node, Node> m) {\n        if (n == null) return null;\n        if (m.containsKey(n)) return m.get(n);\n        Node c = new Node(n.val);\n        m.put(n, c);\n        for (Node v : n.neighbors) c.neighbors.add(copy(v, m));\n        return c;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Clone Graph: what state or invariant makes the solution work?",
        "back": "Map each original node identity to its clone before exploring neighbors. A repeated encounter returns the already allocated clone, preserving cycles and shared references."
      },
      {
        "type": "Edge case",
        "front": "Clone Graph: what implementation trap should you check before submitting?",
        "back": "Register the clone before recursion; registering afterward loops forever on a cycle."
      },
      {
        "type": "Complexity",
        "front": "Clone Graph: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(V + E). Space: O(V) map and recursion, plus O(V + E) output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Clone Graph: trace this case without running code: Two nodes 7--9 ",
        "back": "Two nodes 7--9 => two new objects with the same mutual edge; null => null."
      }
    ],
    "testCode": "Solution s = new Solution();\nNode a=new Node(7),b=new Node(9);a.neighbors.add(b);b.neighbors.add(a);Node c=s.cloneGraph(a);if(c==a||c.val!=7||c.neighbors.get(0)==b||c.neighbors.get(0).neighbors.get(0)!=c)throw new AssertionError();if(s.cloneGraph(null)!=null)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/clone-graph/"
  },
  {
    "id": "lc-207",
    "number": 207,
    "title": "Course Schedule",
    "slug": "course-schedule",
    "difficulty": "Medium",
    "tags": "Graph, Topological sort",
    "context": "Courses are labeled 0 through n-1. Each prerequisite pair [a,b] requires b before a. Return whether every course can be completed.",
    "examples": "n=3, [[1,0],[2,1]] => true; adding [0,2] creates a cycle => false.",
    "solution": "Build edges prerequisite -> dependent. Repeatedly remove indegree-zero courses. Their prerequisites are already removed; a remaining directed cycle prevents the processed count from reaching n.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "pitfall": "Reverse prerequisite pairs consistently; count all courses, including isolated vertices.",
    "followUp": "How could you produce a concrete cycle when completion is impossible?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean canFinish(int n, int[][] p) {\n        List<List<Integer>> g = new ArrayList<>();\n        for (int i = 0; i < n; i++) g.add(new ArrayList<>());\n        int[] in = new int[n];\n        for (int[] e : p) {\n            g.get(e[1]).add(e[0]);\n            in[e[0]]++;\n        }\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) if (in[i] == 0) q.add(i);\n        int seen = 0;\n        while (!q.isEmpty()) {\n            int u = q.remove();\n            seen++;\n            for (int v : g.get(u)) if (--in[v] == 0) q.add(v);\n        }\n        return seen == n;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Course Schedule: what state or invariant makes the solution work?",
        "back": "Build edges prerequisite -> dependent. Repeatedly remove indegree-zero courses. Their prerequisites are already removed; a remaining directed cycle prevents the processed count from reaching n."
      },
      {
        "type": "Edge case",
        "front": "Course Schedule: what implementation trap should you check before submitting?",
        "back": "Reverse prerequisite pairs consistently; count all courses, including isolated vertices."
      },
      {
        "type": "Complexity",
        "front": "Course Schedule: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(V + E). Space: O(V + E). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Course Schedule: trace this case without running code: n=3, [[1,0],[2,1]] ",
        "back": "n=3, [[1,0],[2,1]] => true; adding [0,2] creates a cycle => false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.canFinish(3,new int[][]{{1,0},{2,1}}))throw new AssertionError();if(s.canFinish(3,new int[][]{{1,0},{2,1},{0,2}}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/course-schedule/"
  },
  {
    "id": "lc-210",
    "number": 210,
    "title": "Course Schedule II",
    "slug": "course-schedule-ii",
    "difficulty": "Medium",
    "tags": "Graph, Topological sort",
    "context": "Return any order of all n courses respecting prerequisite pairs [course, prerequisite]. Return an empty array if a directed cycle makes an order impossible.",
    "examples": "n=3, [[1,0],[2,1]] => [0,1,2]; a mutual dependency => [].",
    "solution": "Kahn traversal emits each indegree-zero course before its dependents. If exactly n vertices are emitted, every prerequisite edge points forward in the returned order.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V + E)",
    "pitfall": "A partial topological order is not a valid answer when a disconnected component contains a cycle.",
    "followUp": "What changes if the lexicographically smallest valid ordering is required?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] findOrder(int n, int[][] p) {\n        List<List<Integer>> g = new ArrayList<>();\n        for (int i = 0; i < n; i++) g.add(new ArrayList<>());\n        int[] in = new int[n],\n            out = new int[n];\n        for (int[] e : p) {\n            g.get(e[1]).add(e[0]);\n            in[e[0]]++;\n        }\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < n; i++) if (in[i] == 0) q.add(i);\n        int k = 0;\n        while (!q.isEmpty()) {\n            int u = q.remove();\n            out[k++] = u;\n            for (int v : g.get(u)) if (--in[v] == 0) q.add(v);\n        }\n        return k == n ? out : new int[0];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Course Schedule II: what state or invariant makes the solution work?",
        "back": "Kahn traversal emits each indegree-zero course before its dependents. If exactly n vertices are emitted, every prerequisite edge points forward in the returned order."
      },
      {
        "type": "Edge case",
        "front": "Course Schedule II: what implementation trap should you check before submitting?",
        "back": "A partial topological order is not a valid answer when a disconnected component contains a cycle."
      },
      {
        "type": "Complexity",
        "front": "Course Schedule II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(V + E). Space: O(V + E). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Course Schedule II: trace this case without running code: n=3, [[1,0],[2,1]] ",
        "back": "n=3, [[1,0],[2,1]] => [0,1,2]; a mutual dependency => []."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!Arrays.equals(s.findOrder(3,new int[][]{{1,0},{2,1}}),new int[]{0,1,2}))throw new AssertionError();if(s.findOrder(2,new int[][]{{0,1},{1,0}}).length!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/course-schedule-ii/"
  },
  {
    "id": "lc-130",
    "number": 130,
    "title": "Surrounded Regions",
    "slug": "surrounded-regions",
    "difficulty": "Medium",
    "tags": "Graph, Flood fill",
    "context": "Modify a rectangular board of X and O in place: replace each O region that cannot reach the boundary through four-direction O cells with X.",
    "examples": "XXX / XOX / XXX => all X; an O touching an edge survives.",
    "solution": "Flood boundary O cells first, marking safe cells. Every unmarked O lacks a path to the boundary, so capture it; then restore marked cells.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "Do not capture a region merely because its starting cell is interior; it may have a long path to the boundary.",
    "followUp": "How would eight-direction connectivity change the traversal?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public void solve(char[][] b) {\n        int m = b.length,\n            n = b[0].length;\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (\n            (r == 0 || c == 0 || r == m - 1 || c == n - 1) && b[r][c] == 'O'\n        ) {\n            b[r][c] = '#';\n            q.add(r * n + c);\n        }\n        int[] d = { 1, 0, -1, 0, 1 };\n        while (!q.isEmpty()) {\n            int v = q.remove();\n            for (int k = 0; k < 4; k++) {\n                int r = v / n + d[k],\n                    c = (v % n) + d[k + 1];\n                if (r >= 0 && r < m && c >= 0 && c < n && b[r][c] == 'O') {\n                    b[r][c] = '#';\n                    q.add(r * n + c);\n                }\n            }\n        }\n        for (char[] row : b)\n            for (int j = 0; j < n; j++) row[j] = row[j] == '#' ? 'O' : 'X';\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Surrounded Regions: what state or invariant makes the solution work?",
        "back": "Flood boundary O cells first, marking safe cells. Every unmarked O lacks a path to the boundary, so capture it; then restore marked cells."
      },
      {
        "type": "Edge case",
        "front": "Surrounded Regions: what implementation trap should you check before submitting?",
        "back": "Do not capture a region merely because its starting cell is interior; it may have a long path to the boundary."
      },
      {
        "type": "Complexity",
        "front": "Surrounded Regions: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Surrounded Regions: trace this case without running code: XXX / XOX / XXX ",
        "back": "XXX / XOX / XXX => all X; an O touching an edge survives."
      }
    ],
    "testCode": "Solution s = new Solution();\nchar[][] a={{'X','X','X'},{'X','O','X'},{'X','X','X'}};s.solve(a);if(a[1][1]!='X')throw new AssertionError();char[][] b={{'O'}};s.solve(b);if(b[0][0]!='O')throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/surrounded-regions/"
  },
  {
    "id": "lc-399",
    "number": 399,
    "title": "Evaluate Division",
    "slug": "evaluate-division",
    "difficulty": "Medium",
    "tags": "Graph, Weighted traversal",
    "context": "Consistent positive equations a/b=value define ratios between named variables. Answer each ratio query; return -1 when either variable is unknown or no connecting equations exist.",
    "examples": "p/q=4 and q/r=2 => p/r=8, r/p=0.125; unknown z/z => -1.",
    "solution": "Store a forward weighted edge and its reciprocal. DFS multiplies weights along a path; telescoping ratios give the requested quotient. A visited set prevents cycles.",
    "timeComplexity": "O(E + Q(V + E))",
    "spaceComplexity": "O(V + E)",
    "pitfall": "Unknown x/x is -1, not 1; check graph membership before the equality base case.",
    "followUp": "Compare traversal per query with a weighted union-find for many queries.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public double[] calcEquation(\n        List<List<String>> eq,\n        double[] values,\n        List<List<String>> qs\n    ) {\n        Map<String, Map<String, Double>> g = new HashMap<>();\n        for (int i = 0; i < eq.size(); i++) {\n            String a = eq.get(i).get(0),\n                b = eq.get(i).get(1);\n            g.computeIfAbsent(a, k -> new HashMap<>()).put(b, values[i]);\n            g.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1 / values[i]);\n        }\n        double[] ans = new double[qs.size()];\n        for (int i = 0; i < ans.length; i++) {\n            String a = qs.get(i).get(0),\n                b = qs.get(i).get(1);\n            ans[i] =\n                !g.containsKey(a) || !g.containsKey(b)\n                    ? -1\n                    : dfs(a, b, g, new HashSet<>());\n        }\n        return ans;\n    }\n\n    private double dfs(\n        String a,\n        String b,\n        Map<String, Map<String, Double>> g,\n        Set<String> seen\n    ) {\n        if (a.equals(b)) return 1;\n        seen.add(a);\n        for (var e : g.get(a).entrySet())\n            if (!seen.contains(e.getKey())) {\n                double v = dfs(e.getKey(), b, g, seen);\n                if (v != -1) return e.getValue() * v;\n            }\n        return -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Evaluate Division: what state or invariant makes the solution work?",
        "back": "Store a forward weighted edge and its reciprocal. DFS multiplies weights along a path; telescoping ratios give the requested quotient. A visited set prevents cycles."
      },
      {
        "type": "Edge case",
        "front": "Evaluate Division: what implementation trap should you check before submitting?",
        "back": "Unknown x/x is -1, not 1; check graph membership before the equality base case."
      },
      {
        "type": "Complexity",
        "front": "Evaluate Division: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(E + Q(V + E)). Space: O(V + E). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Evaluate Division: trace this case without running code: p/q=4 and q/r=2 ",
        "back": "p/q=4 and q/r=2 => p/r=8, r/p=0.125; unknown z/z => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\ndouble[] a=s.calcEquation(List.of(List.of(\"p\",\"q\"),List.of(\"q\",\"r\")),new double[]{4,2},List.of(List.of(\"p\",\"r\"),List.of(\"z\",\"z\")));if(Math.abs(a[0]-8)>1e-9)throw new AssertionError();if(a[1]!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/evaluate-division/"
  },
  {
    "id": "lc-547",
    "number": 547,
    "title": "Number of Provinces",
    "slug": "number-of-provinces",
    "difficulty": "Medium",
    "tags": "Graph, Connected components",
    "context": "A symmetric adjacency matrix represents directly connected cities. Count connected components, including isolated cities.",
    "examples": "[[1,1,0],[1,1,0],[0,0,1]] => 2 components.",
    "solution": "Start DFS from each unvisited city. Mark all reachable cities; each new DFS root represents exactly one province.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n)",
    "pitfall": "The matrix diagonal does not create extra provinces; visited state belongs to cities.",
    "followUp": "If edges arrive online, how would union-find maintain the count?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findCircleNum(int[][] a) {\n        boolean[] seen = new boolean[a.length];\n        int ans = 0;\n        for (int i = 0; i < a.length; i++) if (!seen[i]) {\n            ans++;\n            dfs(i, a, seen);\n        }\n        return ans;\n    }\n\n    private void dfs(int u, int[][] a, boolean[] seen) {\n        seen[u] = true;\n        for (int v = 0; v < a.length; v++) if (a[u][v] == 1 && !seen[v]) dfs(\n            v,\n            a,\n            seen\n        );\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Number of Provinces: what state or invariant makes the solution work?",
        "back": "Start DFS from each unvisited city. Mark all reachable cities; each new DFS root represents exactly one province."
      },
      {
        "type": "Edge case",
        "front": "Number of Provinces: what implementation trap should you check before submitting?",
        "back": "The matrix diagonal does not create extra provinces; visited state belongs to cities."
      },
      {
        "type": "Complexity",
        "front": "Number of Provinces: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Number of Provinces: trace this case without running code: [[1,1,0],[1,1,0],[0,0,1]] ",
        "back": "[[1,1,0],[1,1,0],[0,0,1]] => 2 components."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.findCircleNum(new int[][]{{1,1,0},{1,1,0},{0,0,1}})!=2)throw new AssertionError();if(s.findCircleNum(new int[][]{{1}})!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/number-of-provinces/"
  },
  {
    "id": "lc-841",
    "number": 841,
    "title": "Keys and Rooms",
    "slug": "keys-and-rooms",
    "difficulty": "Medium",
    "tags": "Graph, Reachability",
    "context": "Room 0 is open; each room lists keys to other numbered rooms. Return whether collecting reachable keys lets you visit every room.",
    "examples": "[[1],[2],[]] => true; [[1],[],[]] => false because room 2 stays unreachable.",
    "solution": "Treat keys as directed edges. Traverse from room 0 and count distinct visited rooms; access expands only from rooms already reached.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "pitfall": "Keys are directed permissions; do not assume that a key from a to b unlocks a from b.",
    "followUp": "How would you return the rooms that remain unreachable?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n        boolean[] seen = new boolean[rooms.size()];\n        Queue<Integer> q = new ArrayDeque<>();\n        q.add(0);\n        seen[0] = true;\n        int count = 0;\n        while (!q.isEmpty()) {\n            int u = q.remove();\n            count++;\n            for (int v : rooms.get(u))\n                if (!seen[v]) {\n                    seen[v] = true;\n                    q.add(v);\n                }\n        }\n        return count == rooms.size();\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Keys and Rooms: what state or invariant makes the solution work?",
        "back": "Treat keys as directed edges. Traverse from room 0 and count distinct visited rooms; access expands only from rooms already reached."
      },
      {
        "type": "Edge case",
        "front": "Keys and Rooms: what implementation trap should you check before submitting?",
        "back": "Keys are directed permissions; do not assume that a key from a to b unlocks a from b."
      },
      {
        "type": "Complexity",
        "front": "Keys and Rooms: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(V + E). Space: O(V). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Keys and Rooms: trace this case without running code: [[1],[2],[]] ",
        "back": "[[1],[2],[]] => true; [[1],[],[]] => false because room 2 stays unreachable."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.canVisitAllRooms(List.of(List.of(1),List.of(2),List.of())))throw new AssertionError();if(s.canVisitAllRooms(List.of(List.of(1),List.of(),List.of())))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/keys-and-rooms/"
  },
  {
    "id": "lc-994",
    "number": 994,
    "title": "Rotting Oranges",
    "slug": "rotting-oranges",
    "difficulty": "Medium",
    "tags": "Graph, Multi-source BFS",
    "context": "Cells hold empty space, fresh oranges, or rotten oranges. Each minute rot spreads to four-direction fresh neighbors. Return minutes until no fresh fruit remains, or -1 if impossible.",
    "examples": "[[2,1,1]] => 2 minutes; [[1,0,2]] => -1.",
    "solution": "Enqueue all initially rotten cells as distance zero. Each BFS layer is one simultaneous minute. Decrement fresh count exactly when a fresh cell becomes rotten.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "Starting a separate BFS per rotten cell incorrectly serializes simultaneous spread.",
    "followUp": "How would unequal transmission times change BFS into a shortest-path problem?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int orangesRotting(int[][] g) {\n        int m = g.length,\n            n = g[0].length,\n            fresh = 0,\n            t = 0;\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (\n            g[r][c] == 2\n        ) q.add(r * n + c);\n        else if (g[r][c] == 1) fresh++;\n        int[] d = { 1, 0, -1, 0, 1 };\n        while (fresh > 0 && !q.isEmpty()) {\n            int size = q.size();\n            while (size-- > 0) {\n                int v = q.remove();\n                for (int k = 0; k < 4; k++) {\n                    int r = v / n + d[k],\n                        c = (v % n) + d[k + 1];\n                    if (r >= 0 && r < m && c >= 0 && c < n && g[r][c] == 1) {\n                        g[r][c] = 2;\n                        fresh--;\n                        q.add(r * n + c);\n                    }\n                }\n            }\n            t++;\n        }\n        return fresh == 0 ? t : -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Rotting Oranges: what state or invariant makes the solution work?",
        "back": "Enqueue all initially rotten cells as distance zero. Each BFS layer is one simultaneous minute. Decrement fresh count exactly when a fresh cell becomes rotten."
      },
      {
        "type": "Edge case",
        "front": "Rotting Oranges: what implementation trap should you check before submitting?",
        "back": "Starting a separate BFS per rotten cell incorrectly serializes simultaneous spread."
      },
      {
        "type": "Complexity",
        "front": "Rotting Oranges: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Rotting Oranges: trace this case without running code: [[2,1,1]] ",
        "back": "[[2,1,1]] => 2 minutes; [[1,0,2]] => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.orangesRotting(new int[][]{{2,1,1}})!=2)throw new AssertionError();if(s.orangesRotting(new int[][]{{1,0,2}})!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/rotting-oranges/"
  },
  {
    "id": "lc-433",
    "number": 433,
    "title": "Minimum Genetic Mutation",
    "slug": "minimum-genetic-mutation",
    "difficulty": "Medium",
    "tags": "Graph, BFS",
    "context": "Genes have eight characters from A,C,G,T. Change one character per mutation; every resulting gene must be in the bank. Return the minimum mutations from start to end, or -1.",
    "examples": "AAAAAAAA to AAAAAAAC with bank [AAAAAAAC] => 1; empty bank => -1.",
    "solution": "BFS over bank strings, generating all one-position substitutions. Remove a gene from the unused bank when enqueuing, so its first visit uses the fewest mutations.",
    "timeComplexity": "O(B * L² * 4), L=8",
    "spaceComplexity": "O(B * L)",
    "pitfall": "The starting gene need not be in the bank, but the ending gene must be reachable through bank entries.",
    "followUp": "When would bidirectional BFS reduce the search?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minMutation(String start, String end, String[] bank) {\n        Set<String> left = new HashSet<>(Arrays.asList(bank));\n        Queue<String> q = new ArrayDeque<>();\n        q.add(start);\n        left.remove(start);\n        int steps = 0;\n        while (!q.isEmpty()) {\n            int z = q.size();\n            while (z-- > 0) {\n                String u = q.remove();\n                if (u.equals(end)) return steps;\n                char[] a = u.toCharArray();\n                for (int i = 0; i < a.length; i++) {\n                    char old = a[i];\n                    for (char c : new char[] { 'A', 'C', 'G', 'T' }) {\n                        a[i] = c;\n                        String v = new String(a);\n                        if (left.remove(v)) q.add(v);\n                    }\n                    a[i] = old;\n                }\n            }\n            steps++;\n        }\n        return -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Genetic Mutation: what state or invariant makes the solution work?",
        "back": "BFS over bank strings, generating all one-position substitutions. Remove a gene from the unused bank when enqueuing, so its first visit uses the fewest mutations."
      },
      {
        "type": "Edge case",
        "front": "Minimum Genetic Mutation: what implementation trap should you check before submitting?",
        "back": "The starting gene need not be in the bank, but the ending gene must be reachable through bank entries."
      },
      {
        "type": "Complexity",
        "front": "Minimum Genetic Mutation: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(B * L² * 4), L=8. Space: O(B * L). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Minimum Genetic Mutation: trace this case without running code: AAAAAAAA to AAAAAAAC with bank [AAAAAAAC] ",
        "back": "AAAAAAAA to AAAAAAAC with bank [AAAAAAAC] => 1; empty bank => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minMutation(\"AAAAAAAA\",\"AAAAAAAC\",new String[]{\"AAAAAAAC\"})!=1)throw new AssertionError();if(s.minMutation(\"AAAAAAAA\",\"AAAAAAAC\",new String[]{})!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/minimum-genetic-mutation/"
  },
  {
    "id": "lc-127",
    "number": 127,
    "title": "Word Ladder",
    "slug": "word-ladder",
    "difficulty": "Hard",
    "tags": "Graph, BFS",
    "context": "Transform a lowercase word into a distinct same-length target, changing one character at a time. Every new word must belong to the dictionary. Return the minimum number of words in a valid sequence, or zero.",
    "examples": "cat to dog, dictionary [cot,dot,dog] => 4 words: cat,cot,dot,dog.",
    "solution": "Explore one-character dictionary neighbors by BFS. Layer depth counts words, starting at one. Remove visited words on enqueue so each dictionary vertex is processed once.",
    "timeComplexity": "O(26 * N * L²), including Java string creation",
    "spaceComplexity": "O(N * L)",
    "pitfall": "Return word count rather than mutation count, and return zero if the target is absent.",
    "followUp": "Design wildcard buckets or bidirectional BFS; compare their memory costs.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int ladderLength(String begin, String end, List<String> words) {\n        Set<String> left = new HashSet<>(words);\n        if (!left.contains(end)) return 0;\n        Queue<String> q = new ArrayDeque<>();\n        q.add(begin);\n        left.remove(begin);\n        int depth = 1;\n        while (!q.isEmpty()) {\n            int z = q.size();\n            while (z-- > 0) {\n                String u = q.remove();\n                if (u.equals(end)) return depth;\n                char[] a = u.toCharArray();\n                for (int i = 0; i < a.length; i++) {\n                    char old = a[i];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        a[i] = c;\n                        String v = new String(a);\n                        if (left.remove(v)) q.add(v);\n                    }\n                    a[i] = old;\n                }\n            }\n            depth++;\n        }\n        return 0;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Word Ladder: what state or invariant makes the solution work?",
        "back": "Explore one-character dictionary neighbors by BFS. Layer depth counts words, starting at one. Remove visited words on enqueue so each dictionary vertex is processed once."
      },
      {
        "type": "Edge case",
        "front": "Word Ladder: what implementation trap should you check before submitting?",
        "back": "Return word count rather than mutation count, and return zero if the target is absent."
      },
      {
        "type": "Complexity",
        "front": "Word Ladder: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(26 * N * L²), including Java string creation. Space: O(N * L). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Word Ladder: trace this case without running code: cat to dog, dictionary [cot,dot,dog] ",
        "back": "cat to dog, dictionary [cot,dot,dog] => 4 words: cat,cot,dot,dog."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.ladderLength(\"cat\",\"dog\",List.of(\"cot\",\"dot\",\"dog\"))!=4)throw new AssertionError();if(s.ladderLength(\"cat\",\"dog\",List.of(\"cot\",\"dot\"))!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/word-ladder/"
  },
  {
    "id": "lc-909",
    "number": 909,
    "title": "Snakes and Ladders",
    "slug": "snakes-and-ladders",
    "difficulty": "Medium",
    "tags": "Graph, BFS, Coordinate mapping",
    "context": "An n by n board numbers squares in alternating left/right rows from the bottom. Roll 1..6, then apply at most one snake or ladder on the landing square. Return the fewest rolls to n², or -1.",
    "examples": "A 2x2 board with no jumps => 1 roll from square 1 to 4.",
    "solution": "BFS uses square numbers as states and dice outcomes as edges. Convert a square to its serpentine coordinates, apply its single forced jump, and mark the resulting square.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n²)",
    "pitfall": "Do not chain several ladders within a single roll; the rules allow only one jump.",
    "followUp": "How would you return the sequence of rolls and landing squares?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int snakesAndLadders(int[][] b) {\n        int n = b.length,\n            target = n * n;\n        boolean[] seen = new boolean[target + 1];\n        Queue<Integer> q = new ArrayDeque<>();\n        q.add(1);\n        seen[1] = true;\n        int rolls = 0;\n        while (!q.isEmpty()) {\n            int z = q.size();\n            while (z-- > 0) {\n                int u = q.remove();\n                if (u == target) return rolls;\n                for (int v = u + 1; v <= Math.min(u + 6, target); v++) {\n                    int row = (v - 1) / n,\n                        col = (v - 1) % n;\n                    int jump = b[n - 1 - row][row % 2 == 0 ? col : n - 1 - col];\n                    int w = jump == -1 ? v : jump;\n                    if (!seen[w]) {\n                        seen[w] = true;\n                        q.add(w);\n                    }\n                }\n            }\n            rolls++;\n        }\n        return -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Snakes and Ladders: what state or invariant makes the solution work?",
        "back": "BFS uses square numbers as states and dice outcomes as edges. Convert a square to its serpentine coordinates, apply its single forced jump, and mark the resulting square."
      },
      {
        "type": "Edge case",
        "front": "Snakes and Ladders: what implementation trap should you check before submitting?",
        "back": "Do not chain several ladders within a single roll; the rules allow only one jump."
      },
      {
        "type": "Complexity",
        "front": "Snakes and Ladders: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(n²). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Snakes and Ladders: trace this case without running code: A 2x2 board with no jumps ",
        "back": "A 2x2 board with no jumps => 1 roll from square 1 to 4."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.snakesAndLadders(new int[][]{{-1,-1},{-1,-1}})!=1)throw new AssertionError();if(s.snakesAndLadders(new int[][]{{-1,-1,-1},{-1,-1,-1},{-1,-1,-1}})!=2)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/snakes-and-ladders/"
  },
  {
    "id": "lc-752",
    "number": 752,
    "title": "Open the Lock",
    "slug": "open-the-lock",
    "difficulty": "Medium",
    "tags": "Graph, BFS",
    "context": "A four-wheel decimal lock starts at 0000. One move rotates one wheel by one step with wraparound. Forbidden combinations cannot be entered. Return minimum moves to the target, or -1.",
    "examples": "No forbidden states, target 0009 => 1 via wraparound; forbidden 0000 => -1.",
    "solution": "BFS explores eight neighboring combinations per state. Use the forbidden set as a combined blocked/visited set; first arrival has minimum moves.",
    "timeComplexity": "O(10⁴) for fixed four-wheel lock",
    "spaceComplexity": "O(10⁴)",
    "pitfall": "Check whether the starting state is forbidden before accepting even target 0000.",
    "followUp": "Generalize the state-space size to w wheels with base b.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int openLock(String[] dead, String target) {\n        Set<String> seen = new HashSet<>(Arrays.asList(dead));\n        if (!seen.add(\"0000\")) return -1;\n        Queue<String> q = new ArrayDeque<>();\n        q.add(\"0000\");\n        int steps = 0;\n        while (!q.isEmpty()) {\n            int z = q.size();\n            while (z-- > 0) {\n                String u = q.remove();\n                if (u.equals(target)) return steps;\n                char[] a = u.toCharArray();\n                for (int i = 0; i < 4; i++) {\n                    char old = a[i];\n                    for (int d : new int[] { -1, 1 }) {\n                        a[i] = (char) ('0' + ((old - '0' + d + 10) % 10));\n                        String v = new String(a);\n                        if (seen.add(v)) q.add(v);\n                    }\n                    a[i] = old;\n                }\n            }\n            steps++;\n        }\n        return -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Open the Lock: what state or invariant makes the solution work?",
        "back": "BFS explores eight neighboring combinations per state. Use the forbidden set as a combined blocked/visited set; first arrival has minimum moves."
      },
      {
        "type": "Edge case",
        "front": "Open the Lock: what implementation trap should you check before submitting?",
        "back": "Check whether the starting state is forbidden before accepting even target 0000."
      },
      {
        "type": "Complexity",
        "front": "Open the Lock: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(10⁴) for fixed four-wheel lock. Space: O(10⁴). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Open the Lock: trace this case without running code: No forbidden states, target 0009 ",
        "back": "No forbidden states, target 0009 => 1 via wraparound; forbidden 0000 => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.openLock(new String[]{},\"0009\")!=1)throw new AssertionError();if(s.openLock(new String[]{\"0000\"},\"0000\")!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/open-the-lock/"
  },
  {
    "id": "lc-785",
    "number": 785,
    "title": "Is Graph Bipartite?",
    "slug": "is-graph-bipartite",
    "difficulty": "Medium",
    "tags": "Graph, Two-coloring",
    "context": "An undirected graph is supplied as adjacency lists. Return whether its vertices can be split into two groups so every edge joins different groups. The graph may be disconnected.",
    "examples": "A path 0--1--2 => true; a triangle => false.",
    "solution": "BFS each uncolored component and assign opposite colors across edges. An equal-color edge is an odd-cycle contradiction; without contradictions the colors form the partition.",
    "timeComplexity": "O(V + E)",
    "spaceComplexity": "O(V)",
    "pitfall": "Start a traversal for every component, not only vertex zero.",
    "followUp": "How would you reconstruct an odd cycle as a failure certificate?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isBipartite(int[][] g) {\n        int[] c = new int[g.length];\n        for (int root = 0; root < g.length; root++) if (c[root] == 0) {\n            Queue<Integer> q = new ArrayDeque<>();\n            q.add(root);\n            c[root] = 1;\n            while (!q.isEmpty()) {\n                int u = q.remove();\n                for (int v : g[u]) {\n                    if (c[v] == c[u]) return false;\n                    if (c[v] == 0) {\n                        c[v] = -c[u];\n                        q.add(v);\n                    }\n                }\n            }\n        }\n        return true;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Is Graph Bipartite?: what state or invariant makes the solution work?",
        "back": "BFS each uncolored component and assign opposite colors across edges. An equal-color edge is an odd-cycle contradiction; without contradictions the colors form the partition."
      },
      {
        "type": "Edge case",
        "front": "Is Graph Bipartite?: what implementation trap should you check before submitting?",
        "back": "Start a traversal for every component, not only vertex zero."
      },
      {
        "type": "Complexity",
        "front": "Is Graph Bipartite?: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(V + E). Space: O(V). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Is Graph Bipartite?: trace this case without running code: A path 0--1--2 ",
        "back": "A path 0--1--2 => true; a triangle => false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.isBipartite(new int[][]{{1},{0,2},{1}}))throw new AssertionError();if(s.isBipartite(new int[][]{{1,2},{0,2},{0,1}}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/is-graph-bipartite/"
  },
  {
    "id": "lc-886",
    "number": 886,
    "title": "Possible Bipartition",
    "slug": "possible-bipartition",
    "difficulty": "Medium",
    "tags": "Graph, Two-coloring",
    "context": "People are labeled 1..n; each dislike pair must be placed in different groups. Return whether two groups suffice.",
    "examples": "n=3, dislikes [[1,2],[2,3]] => true; add [1,3] => false.",
    "solution": "Construct an undirected dislike graph and two-color each component. Every processed edge enforces opposite colors, and a conflict proves no valid partition exists.",
    "timeComplexity": "O(n + dislikes.length)",
    "spaceComplexity": "O(n + dislikes.length)",
    "pitfall": "Input is one-indexed; allocate n+1 slots or translate consistently.",
    "followUp": "How would you return the actual groups when a solution exists?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean possibleBipartition(int n, int[][] edges) {\n        List<List<Integer>> g = new ArrayList<>();\n        for (int i = 0; i <= n; i++) g.add(new ArrayList<>());\n        for (int[] e : edges) {\n            g.get(e[0]).add(e[1]);\n            g.get(e[1]).add(e[0]);\n        }\n        int[] c = new int[n + 1];\n        for (int r = 1; r <= n; r++) if (c[r] == 0) {\n            Queue<Integer> q = new ArrayDeque<>();\n            q.add(r);\n            c[r] = 1;\n            while (!q.isEmpty()) {\n                int u = q.remove();\n                for (int v : g.get(u)) {\n                    if (c[v] == c[u]) return false;\n                    if (c[v] == 0) {\n                        c[v] = -c[u];\n                        q.add(v);\n                    }\n                }\n            }\n        }\n        return true;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Possible Bipartition: what state or invariant makes the solution work?",
        "back": "Construct an undirected dislike graph and two-color each component. Every processed edge enforces opposite colors, and a conflict proves no valid partition exists."
      },
      {
        "type": "Edge case",
        "front": "Possible Bipartition: what implementation trap should you check before submitting?",
        "back": "Input is one-indexed; allocate n+1 slots or translate consistently."
      },
      {
        "type": "Complexity",
        "front": "Possible Bipartition: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n + dislikes.length). Space: O(n + dislikes.length). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Possible Bipartition: trace this case without running code: n=3, dislikes [[1,2],[2,3]] ",
        "back": "n=3, dislikes [[1,2],[2,3]] => true; add [1,3] => false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.possibleBipartition(3,new int[][]{{1,2},{2,3}}))throw new AssertionError();if(s.possibleBipartition(3,new int[][]{{1,2},{2,3},{1,3}}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/possible-bipartition/"
  },
  {
    "id": "lc-684",
    "number": 684,
    "title": "Redundant Connection",
    "slug": "redundant-connection",
    "difficulty": "Medium",
    "tags": "Graph, Union-find",
    "context": "An undirected tree on labels 1..n has one additional edge. Return the edge whose removal restores a tree; when several removals work, return the one appearing last in input order.",
    "examples": "[[1,2],[2,3],[1,3]] => [1,3], whose endpoints are already connected.",
    "solution": "Union endpoints in input order. A failed union identifies the edge closing the unique cycle; because its other cycle edges appeared earlier, it is the last removable cycle edge.",
    "timeComplexity": "O(n α(n))",
    "spaceComplexity": "O(n)",
    "pitfall": "Compare representatives, not immediate parents. Path compression alone does not make parent labels equal automatically.",
    "followUp": "How does the directed redundant-edge variant differ?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] findRedundantConnection(int[][] e) {\n        int[] p = new int[e.length + 1],\n            size = new int[p.length];\n        for (int i = 0; i < p.length; i++) {\n            p[i] = i;\n            size[i] = 1;\n        }\n        for (int[] a : e) {\n            int x = find(p, a[0]),\n                y = find(p, a[1]);\n            if (x == y) return a;\n            if (size[x] < size[y]) {\n                int t = x;\n                x = y;\n                y = t;\n            }\n            p[y] = x;\n            size[x] += size[y];\n        }\n        return new int[0];\n    }\n\n    private int find(int[] p, int x) {\n        while (p[x] != x) {\n            p[x] = p[p[x]];\n            x = p[x];\n        }\n        return x;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Redundant Connection: what state or invariant makes the solution work?",
        "back": "Union endpoints in input order. A failed union identifies the edge closing the unique cycle; because its other cycle edges appeared earlier, it is the last removable cycle edge."
      },
      {
        "type": "Edge case",
        "front": "Redundant Connection: what implementation trap should you check before submitting?",
        "back": "Compare representatives, not immediate parents. Path compression alone does not make parent labels equal automatically."
      },
      {
        "type": "Complexity",
        "front": "Redundant Connection: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n α(n)). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Redundant Connection: trace this case without running code: [[1,2],[2,3],[1,3]] ",
        "back": "[[1,2],[2,3],[1,3]] => [1,3], whose endpoints are already connected."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!Arrays.equals(s.findRedundantConnection(new int[][]{{1,2},{2,3},{1,3}}),new int[]{1,3}))throw new AssertionError();if(!Arrays.equals(s.findRedundantConnection(new int[][]{{1,2},{1,3},{2,3}}),new int[]{2,3}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/redundant-connection/"
  },
  {
    "id": "lc-1319",
    "number": 1319,
    "title": "Number of Operations to Make Network Connected",
    "slug": "number-of-operations-to-make-network-connected",
    "difficulty": "Medium",
    "tags": "Graph, Union-find",
    "context": "There are n computers and undirected cables. One operation moves a redundant cable to connect a different pair. Return the minimum moves needed for full connectivity, or -1.",
    "examples": "n=4 with triangle edges among 0,1,2 => 1 move to connect computer 3; one cable => -1.",
    "solution": "At least n-1 cables are necessary. If enough cables exist, count components with union-find; exactly components-1 spare cables can join them, because the remaining cables exceed a spanning forest by that amount.",
    "timeComplexity": "O(n + E α(n))",
    "spaceComplexity": "O(n)",
    "pitfall": "Check the total cable count before returning components-1; isolated vertices still count as components.",
    "followUp": "Prove why sufficient total cables guarantee enough redundant cables.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int makeConnected(int n, int[][] e) {\n        if (e.length < n - 1) return -1;\n        int[] p = new int[n],\n            sz = new int[n];\n        for (int i = 0; i < n; i++) {\n            p[i] = i;\n            sz[i] = 1;\n        }\n        int parts = n;\n        for (int[] a : e) {\n            int x = find(p, a[0]),\n                y = find(p, a[1]);\n            if (x != y) {\n                if (sz[x] < sz[y]) {\n                    int t = x;\n                    x = y;\n                    y = t;\n                }\n                p[y] = x;\n                sz[x] += sz[y];\n                parts--;\n            }\n        }\n        return parts - 1;\n    }\n\n    private int find(int[] p, int x) {\n        while (p[x] != x) {\n            p[x] = p[p[x]];\n            x = p[x];\n        }\n        return x;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Number of Operations to Make Network Connected: what state or invariant makes the solution work?",
        "back": "At least n-1 cables are necessary. If enough cables exist, count components with union-find; exactly components-1 spare cables can join them, because the remaining cables exceed a spanning forest by that amount."
      },
      {
        "type": "Edge case",
        "front": "Number of Operations to Make Network Connected: what implementation trap should you check before submitting?",
        "back": "Check the total cable count before returning components-1; isolated vertices still count as components."
      },
      {
        "type": "Complexity",
        "front": "Number of Operations to Make Network Connected: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n + E α(n)). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Number of Operations to Make Network Connected: trace this case without running code: n=4 with triangle edges among 0,1,2 ",
        "back": "n=4 with triangle edges among 0,1,2 => 1 move to connect computer 3; one cable => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.makeConnected(4,new int[][]{{0,1},{1,2},{2,0}})!=1)throw new AssertionError();if(s.makeConnected(4,new int[][]{{0,1}})!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/"
  },
  {
    "id": "lc-721",
    "number": 721,
    "title": "Accounts Merge",
    "slug": "accounts-merge",
    "difficulty": "Medium",
    "tags": "Graph, Union-find",
    "context": "Each account contains a name followed by emails. Accounts sharing any email belong to the same person. Merge connected accounts, sorting unique emails; equal names alone do not imply identity.",
    "examples": "[Ana,a@x,b@x] and [Ana,b@x,c@x] => [Ana,a@x,b@x,c@x].",
    "solution": "Assign every email an owning account index and union accounts whenever an email repeats. Group emails by final representative, sort each group, and prepend the representative name.",
    "timeComplexity": "O(M α(A) + M log M), M=email occurrences, A=accounts",
    "spaceComplexity": "O(M + A)",
    "pitfall": "Do not merge solely by name; connectivity through shared emails is transitive.",
    "followUp": "How would you preserve original account IDs as provenance?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\n        int n = accounts.size();\n        int[] p = new int[n],\n            sz = new int[n];\n        for (int i = 0; i < n; i++) {\n            p[i] = i;\n            sz[i] = 1;\n        }\n        Map<String, Integer> owner = new HashMap<>();\n        for (int i = 0; i < n; i++) for (\n            int j = 1;\n            j < accounts.get(i).size();\n            j++\n        ) {\n            String email = accounts.get(i).get(j);\n            Integer prev = owner.putIfAbsent(email, i);\n            if (prev != null) {\n                int a = find(p, i),\n                    b = find(p, prev);\n                if (a != b) {\n                    if (sz[a] < sz[b]) {\n                        int t = a;\n                        a = b;\n                        b = t;\n                    }\n                    p[b] = a;\n                    sz[a] += sz[b];\n                }\n            }\n        }\n        Map<Integer, List<String>> groups = new HashMap<>();\n        for (var e : owner.entrySet())\n            groups\n                .computeIfAbsent(find(p, e.getValue()), k -> new ArrayList<>())\n                .add(e.getKey());\n        List<List<String>> ans = new ArrayList<>();\n        for (var e : groups.entrySet()) {\n            Collections.sort(e.getValue());\n            e.getValue().add(0, accounts.get(e.getKey()).get(0));\n            ans.add(e.getValue());\n        }\n        return ans;\n    }\n\n    private int find(int[] p, int x) {\n        while (p[x] != x) {\n            p[x] = p[p[x]];\n            x = p[x];\n        }\n        return x;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Accounts Merge: what state or invariant makes the solution work?",
        "back": "Assign every email an owning account index and union accounts whenever an email repeats. Group emails by final representative, sort each group, and prepend the representative name."
      },
      {
        "type": "Edge case",
        "front": "Accounts Merge: what implementation trap should you check before submitting?",
        "back": "Do not merge solely by name; connectivity through shared emails is transitive."
      },
      {
        "type": "Complexity",
        "front": "Accounts Merge: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(M α(A) + M log M), M=email occurrences, A=accounts. Space: O(M + A). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Accounts Merge: trace this case without running code: [Ana,a@x,b@x] and [Ana,b@x,c@x] ",
        "back": "[Ana,a@x,b@x] and [Ana,b@x,c@x] => [Ana,a@x,b@x,c@x]."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.accountsMerge(List.of(List.of(\"Ana\",\"a@x\",\"b@x\"),List.of(\"Ana\",\"b@x\",\"c@x\")));if(a.size()!=1||!a.get(0).equals(List.of(\"Ana\",\"a@x\",\"b@x\",\"c@x\")))throw new AssertionError();if(s.accountsMerge(List.of(List.of(\"Ana\",\"a@x\"),List.of(\"Ana\",\"b@x\"))).size()!=2)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/accounts-merge/"
  },
  {
    "id": "lc-743",
    "number": 743,
    "title": "Network Delay Time",
    "slug": "network-delay-time",
    "difficulty": "Medium",
    "tags": "Graph, Dijkstra",
    "context": "Directed edges [u,v,w] give nonnegative travel times on nodes 1..n. A signal begins at k. Return the time when all nodes receive it, or -1 if any node is unreachable.",
    "examples": "1->2 costs 3, 2->3 costs 4 => delay 7 from node 1.",
    "solution": "Dijkstra finalizes the smallest known arrival time because edge costs are nonnegative. Relax outgoing edges and skip stale queue entries; the maximum shortest distance is the total delay.",
    "timeComplexity": "O((V + E) log(V + E))",
    "spaceComplexity": "O(V + E)",
    "pitfall": "The answer is the maximum shortest arrival, not a sum of distances or a minimum spanning-tree weight.",
    "followUp": "Why would negative edges invalidate the greedy finalization?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int networkDelayTime(int[][] times, int n, int k) {\n        List<List<int[]>> g = new ArrayList<>();\n        for (int i = 0; i <= n; i++) g.add(new ArrayList<>());\n        for (int[] e : times) g.get(e[0]).add(new int[] { e[1], e[2] });\n        int[] d = new int[n + 1];\n        Arrays.fill(d, Integer.MAX_VALUE);\n        d[k] = 0;\n        PriorityQueue<int[]> q = new PriorityQueue<>(\n            Comparator.comparingInt(a -> a[1])\n        );\n        q.add(new int[] { k, 0 });\n        while (!q.isEmpty()) {\n            int[] u = q.remove();\n            if (u[1] != d[u[0]]) continue;\n            for (int[] e : g.get(u[0]))\n                if (d[e[0]] > u[1] + e[1]) {\n                    d[e[0]] = u[1] + e[1];\n                    q.add(new int[] { e[0], d[e[0]] });\n                }\n        }\n        int ans = 0;\n        for (int i = 1; i <= n; i++) {\n            if (d[i] == Integer.MAX_VALUE) return -1;\n            ans = Math.max(ans, d[i]);\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Network Delay Time: what state or invariant makes the solution work?",
        "back": "Dijkstra finalizes the smallest known arrival time because edge costs are nonnegative. Relax outgoing edges and skip stale queue entries; the maximum shortest distance is the total delay."
      },
      {
        "type": "Edge case",
        "front": "Network Delay Time: what implementation trap should you check before submitting?",
        "back": "The answer is the maximum shortest arrival, not a sum of distances or a minimum spanning-tree weight."
      },
      {
        "type": "Complexity",
        "front": "Network Delay Time: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O((V + E) log(V + E)). Space: O(V + E). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Network Delay Time: trace this case without running code: 1->2 costs 3, 2->3 costs 4 ",
        "back": "1->2 costs 3, 2->3 costs 4 => delay 7 from node 1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.networkDelayTime(new int[][]{{1,2,3},{2,3,4}},3,1)!=7)throw new AssertionError();if(s.networkDelayTime(new int[][]{{1,2,3}},3,1)!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/network-delay-time/"
  },
  {
    "id": "lc-787",
    "number": 787,
    "title": "Cheapest Flights Within K Stops",
    "slug": "cheapest-flights-within-k-stops",
    "difficulty": "Medium",
    "tags": "Graph, Bellman-Ford, Dynamic programming",
    "context": "Directed flights have positive prices. Return the cheapest cost from source to destination using at most k intermediate stops, or -1. A route may use at most k+1 edges.",
    "examples": "0->1=3, 1->2=3, 0->2=9: k=0 => 9; k=1 => 6.",
    "solution": "Run k+1 bounded Bellman-Ford rounds. Read only the previous distance array and write a clone, so round i represents routes using at most i edges.",
    "timeComplexity": "O((k + 1)(V + E))",
    "spaceComplexity": "O(V)",
    "pitfall": "In-place relaxation can use several flights in one round and violate the stop limit.",
    "followUp": "How would you reconstruct the optimal route while retaining the edge budget?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findCheapestPrice(\n        int n,\n        int[][] flights,\n        int src,\n        int dst,\n        int k\n    ) {\n        int inf = 1_000_000_000;\n        int[] d = new int[n];\n        Arrays.fill(d, inf);\n        d[src] = 0;\n        for (int i = 0; i <= k; i++) {\n            int[] next = d.clone();\n            for (int[] e : flights)\n                if (d[e[0]] != inf) next[e[1]] = Math.min(\n                    next[e[1]],\n                    d[e[0]] + e[2]\n                );\n            d = next;\n        }\n        return d[dst] == inf ? -1 : d[dst];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Cheapest Flights Within K Stops: what state or invariant makes the solution work?",
        "back": "Run k+1 bounded Bellman-Ford rounds. Read only the previous distance array and write a clone, so round i represents routes using at most i edges."
      },
      {
        "type": "Edge case",
        "front": "Cheapest Flights Within K Stops: what implementation trap should you check before submitting?",
        "back": "In-place relaxation can use several flights in one round and violate the stop limit."
      },
      {
        "type": "Complexity",
        "front": "Cheapest Flights Within K Stops: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O((k + 1)(V + E)). Space: O(V). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Cheapest Flights Within K Stops: trace this case without running code: 0->1=3, 1->2=3, 0->2=9: k=0 ",
        "back": "0->1=3, 1->2=3, 0->2=9: k=0 => 9; k=1 => 6."
      }
    ],
    "testCode": "Solution s = new Solution();\nint[][] f={{0,1,3},{1,2,3},{0,2,9}};if(s.findCheapestPrice(3,f,0,2,0)!=9)throw new AssertionError();if(s.findCheapestPrice(3,f,0,2,1)!=6)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
  },
  {
    "id": "lc-1584",
    "number": 1584,
    "title": "Min Cost to Connect All Points",
    "slug": "min-cost-to-connect-all-points",
    "difficulty": "Medium",
    "tags": "Graph, Minimum spanning tree, Prim",
    "context": "Connect all 2D points with minimum total Manhattan edge cost so every point can reach every other. Return the total cost of a minimum spanning tree.",
    "examples": "[(0,0),(2,0),(2,3)] => 5 by edges of lengths 2 and 3.",
    "solution": "Dense Prim keeps each unchosen point’s cheapest edge to the chosen set. Repeatedly add the minimum such point; the cut property guarantees a safe spanning-tree edge.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n)",
    "pitfall": "A shortest-path tree and a minimum spanning tree optimize different objectives.",
    "followUp": "When is Kruskal practical compared with this implicit dense graph?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minCostConnectPoints(int[][] p) {\n        int n = p.length,\n            ans = 0;\n        int[] best = new int[n];\n        Arrays.fill(best, Integer.MAX_VALUE);\n        best[0] = 0;\n        boolean[] used = new boolean[n];\n        for (int z = 0; z < n; z++) {\n            int u = -1;\n            for (int i = 0; i < n; i++) if (\n                !used[i] && (u == -1 || best[i] < best[u])\n            ) u = i;\n            used[u] = true;\n            ans += best[u];\n            for (int v = 0; v < n; v++) if (!used[v]) best[v] = Math.min(\n                best[v],\n                Math.abs(p[u][0] - p[v][0]) + Math.abs(p[u][1] - p[v][1])\n            );\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Min Cost to Connect All Points: what state or invariant makes the solution work?",
        "back": "Dense Prim keeps each unchosen point’s cheapest edge to the chosen set. Repeatedly add the minimum such point; the cut property guarantees a safe spanning-tree edge."
      },
      {
        "type": "Edge case",
        "front": "Min Cost to Connect All Points: what implementation trap should you check before submitting?",
        "back": "A shortest-path tree and a minimum spanning tree optimize different objectives."
      },
      {
        "type": "Complexity",
        "front": "Min Cost to Connect All Points: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Min Cost to Connect All Points: trace this case without running code: [(0,0),(2,0),(2,3)] ",
        "back": "[(0,0),(2,0),(2,3)] => 5 by edges of lengths 2 and 3."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minCostConnectPoints(new int[][]{{0,0},{2,0},{2,3}})!=5)throw new AssertionError();if(s.minCostConnectPoints(new int[][]{{4,7}})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/min-cost-to-connect-all-points/"
  },
  {
    "id": "lc-1631",
    "number": 1631,
    "title": "Path With Minimum Effort",
    "slug": "path-with-minimum-effort",
    "difficulty": "Medium",
    "tags": "Graph, Dijkstra, Minimax",
    "context": "Travel from the top-left to bottom-right of a height grid using four-direction steps. A path’s effort is its largest adjacent height difference. Return the minimum possible effort.",
    "examples": "[[1,4],[2,3]] => effort 1 via down then right.",
    "solution": "Use Dijkstra with path extension max(current effort, edge difference). This cost never decreases when extending a path, so extracting the smallest effort safely finalizes a cell.",
    "timeComplexity": "O(rows * cols * log(rows * cols))",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "Relax using max, not addition; the objective is a bottleneck, not total elevation change.",
    "followUp": "Compare binary-search plus reachability with union-find over sorted edges.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minimumEffortPath(int[][] h) {\n        int m = h.length,\n            n = h[0].length;\n        int[][] dist = new int[m][n];\n        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);\n        dist[0][0] = 0;\n        PriorityQueue<int[]> q = new PriorityQueue<>(\n            Comparator.comparingInt(a -> a[2])\n        );\n        q.add(new int[] { 0, 0, 0 });\n        int[] d = { 1, 0, -1, 0, 1 };\n        while (!q.isEmpty()) {\n            int[] u = q.remove();\n            if (u[2] != dist[u[0]][u[1]]) continue;\n            if (u[0] == m - 1 && u[1] == n - 1) return u[2];\n            for (int k = 0; k < 4; k++) {\n                int r = u[0] + d[k],\n                    c = u[1] + d[k + 1];\n                if (r >= 0 && r < m && c >= 0 && c < n) {\n                    int v = Math.max(u[2], Math.abs(h[r][c] - h[u[0]][u[1]]));\n                    if (v < dist[r][c]) {\n                        dist[r][c] = v;\n                        q.add(new int[] { r, c, v });\n                    }\n                }\n            }\n        }\n        return 0;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Path With Minimum Effort: what state or invariant makes the solution work?",
        "back": "Use Dijkstra with path extension max(current effort, edge difference). This cost never decreases when extending a path, so extracting the smallest effort safely finalizes a cell."
      },
      {
        "type": "Edge case",
        "front": "Path With Minimum Effort: what implementation trap should you check before submitting?",
        "back": "Relax using max, not addition; the objective is a bottleneck, not total elevation change."
      },
      {
        "type": "Complexity",
        "front": "Path With Minimum Effort: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols * log(rows * cols)). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Path With Minimum Effort: trace this case without running code: [[1,4],[2,3]] ",
        "back": "[[1,4],[2,3]] => effort 1 via down then right."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minimumEffortPath(new int[][]{{1,4},{2,3}})!=1)throw new AssertionError();if(s.minimumEffortPath(new int[][]{{8}})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/path-with-minimum-effort/"
  },
  {
    "id": "lc-797",
    "number": 797,
    "title": "All Paths From Source to Target",
    "slug": "all-paths-from-source-to-target",
    "difficulty": "Medium",
    "tags": "Graph, DAG, Backtracking",
    "context": "Given adjacency lists for a directed acyclic graph labeled 0..n-1, return every path from 0 to n-1. Output order is arbitrary.",
    "examples": "[[1,2],[3],[3],[]] => [0,1,3] and [0,2,3].",
    "solution": "Backtrack with the current path. Append a neighbor, explore its suffixes, and remove it. The DAG assumption prevents cycles; copy a path only at the target.",
    "timeComplexity": "O(total emitted path length + explored prefixes), O(n * 2^n) upper bound",
    "spaceComplexity": "O(n) working recursion, plus output",
    "pitfall": "A global visited set loses valid paths that share a suffix.",
    "followUp": "How would you count paths without materializing them?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> allPathsSourceTarget(int[][] g) {\n        List<List<Integer>> ans = new ArrayList<>();\n        List<Integer> path = new ArrayList<>();\n        path.add(0);\n        dfs(0, g, path, ans);\n        return ans;\n    }\n\n    private void dfs(\n        int u,\n        int[][] g,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (u == g.length - 1) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int v : g[u]) {\n            p.add(v);\n            dfs(v, g, p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "All Paths From Source to Target: what state or invariant makes the solution work?",
        "back": "Backtrack with the current path. Append a neighbor, explore its suffixes, and remove it. The DAG assumption prevents cycles; copy a path only at the target."
      },
      {
        "type": "Edge case",
        "front": "All Paths From Source to Target: what implementation trap should you check before submitting?",
        "back": "A global visited set loses valid paths that share a suffix."
      },
      {
        "type": "Complexity",
        "front": "All Paths From Source to Target: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(total emitted path length + explored prefixes), O(n * 2^n) upper bound. Space: O(n) working recursion, plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "All Paths From Source to Target: trace this case without running code: [[1,2],[3],[3],[]] ",
        "back": "[[1,2],[3],[3],[]] => [0,1,3] and [0,2,3]."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.allPathsSourceTarget(new int[][]{{1,2},{3},{3},{}});if(a.size()!=2||!a.contains(List.of(0,2,3)))throw new AssertionError();if(!s.allPathsSourceTarget(new int[][]{{1},{}}).equals(List.of(List.of(0,1))))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/all-paths-from-source-to-target/"
  },
  {
    "id": "lc-1091",
    "number": 1091,
    "title": "Shortest Path in Binary Matrix",
    "slug": "shortest-path-in-binary-matrix",
    "difficulty": "Medium",
    "tags": "Graph, BFS, Grid",
    "context": "In a square binary grid, zero is open and one is blocked. Move in eight directions from top-left to bottom-right. Return the fewest cells on a clear path, or -1. This solution marks the grid.",
    "examples": "[[0,1],[1,0]] => 2 using a diagonal; blocked start => -1.",
    "solution": "BFS over open cells counts layers from one. The first destination visit is shortest because every allowed move costs one.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n²)",
    "pitfall": "This problem allows diagonals and counts cells, unlike four-direction problems that count edges.",
    "followUp": "What heuristic would an A* implementation use for eight-direction unit movement?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int shortestPathBinaryMatrix(int[][] g) {\n        int n = g.length;\n        if (g[0][0] != 0 || g[n - 1][n - 1] != 0) return -1;\n        Queue<Integer> q = new ArrayDeque<>();\n        q.add(0);\n        g[0][0] = 1;\n        int len = 1;\n        while (!q.isEmpty()) {\n            int z = q.size();\n            while (z-- > 0) {\n                int u = q.remove(),\n                    r = u / n,\n                    c = u % n;\n                if (r == n - 1 && c == n - 1) return len;\n                for (int dr = -1; dr <= 1; dr++) for (\n                    int dc = -1;\n                    dc <= 1;\n                    dc++\n                ) {\n                    int a = r + dr,\n                        b = c + dc;\n                    if (a >= 0 && a < n && b >= 0 && b < n && g[a][b] == 0) {\n                        g[a][b] = 1;\n                        q.add(a * n + b);\n                    }\n                }\n            }\n            len++;\n        }\n        return -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Shortest Path in Binary Matrix: what state or invariant makes the solution work?",
        "back": "BFS over open cells counts layers from one. The first destination visit is shortest because every allowed move costs one."
      },
      {
        "type": "Edge case",
        "front": "Shortest Path in Binary Matrix: what implementation trap should you check before submitting?",
        "back": "This problem allows diagonals and counts cells, unlike four-direction problems that count edges."
      },
      {
        "type": "Complexity",
        "front": "Shortest Path in Binary Matrix: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(n²). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Shortest Path in Binary Matrix: trace this case without running code: [[0,1],[1,0]] ",
        "back": "[[0,1],[1,0]] => 2 using a diagonal; blocked start => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.shortestPathBinaryMatrix(new int[][]{{0,1},{1,0}})!=2)throw new AssertionError();if(s.shortestPathBinaryMatrix(new int[][]{{1}})!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/shortest-path-in-binary-matrix/"
  },
  {
    "id": "lc-1926",
    "number": 1926,
    "title": "Nearest Exit from Entrance in Maze",
    "slug": "nearest-exit-from-entrance-in-maze",
    "difficulty": "Medium",
    "tags": "Graph, BFS, Grid",
    "context": "A maze uses dots for open cells and plus signs for walls. From an open entrance, find the fewest four-direction steps to another boundary open cell. The entrance itself is not an exit.",
    "examples": "One row \"...\", entrance at middle => 1; a single open cell => -1.",
    "solution": "BFS from the entrance and test boundary status after at least one step. Mark cells on enqueue; the first eligible boundary cell is the closest exit.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "Exclude the entrance even when it lies on the boundary; preserve this distinction before marking cells.",
    "followUp": "How would multiple entrances be handled in one traversal?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int nearestExit(char[][] maze, int[] entrance) {\n        int m = maze.length,\n            n = maze[0].length;\n        Queue<Integer> q = new ArrayDeque<>();\n        q.add(entrance[0] * n + entrance[1]);\n        maze[entrance[0]][entrance[1]] = '+';\n        int steps = 0;\n        int[] d = { 1, 0, -1, 0, 1 };\n        while (!q.isEmpty()) {\n            int z = q.size();\n            while (z-- > 0) {\n                int u = q.remove(),\n                    r = u / n,\n                    c = u % n;\n                if (\n                    steps > 0 && (r == 0 || c == 0 || r == m - 1 || c == n - 1)\n                ) return steps;\n                for (int k = 0; k < 4; k++) {\n                    int a = r + d[k],\n                        b = c + d[k + 1];\n                    if (\n                        a >= 0 && a < m && b >= 0 && b < n && maze[a][b] == '.'\n                    ) {\n                        maze[a][b] = '+';\n                        q.add(a * n + b);\n                    }\n                }\n            }\n            steps++;\n        }\n        return -1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Nearest Exit from Entrance in Maze: what state or invariant makes the solution work?",
        "back": "BFS from the entrance and test boundary status after at least one step. Mark cells on enqueue; the first eligible boundary cell is the closest exit."
      },
      {
        "type": "Edge case",
        "front": "Nearest Exit from Entrance in Maze: what implementation trap should you check before submitting?",
        "back": "Exclude the entrance even when it lies on the boundary; preserve this distinction before marking cells."
      },
      {
        "type": "Complexity",
        "front": "Nearest Exit from Entrance in Maze: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Nearest Exit from Entrance in Maze: trace this case without running code: One row \"...\", entrance at middle ",
        "back": "One row \"...\", entrance at middle => 1; a single open cell => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.nearestExit(new char[][]{{'.','.','.'}},new int[]{0,1})!=1)throw new AssertionError();if(s.nearestExit(new char[][]{{'.'}},new int[]{0,0})!=-1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/"
  },
  {
    "id": "lc-417",
    "number": 417,
    "title": "Pacific Atlantic Water Flow",
    "slug": "pacific-atlantic-water-flow",
    "difficulty": "Medium",
    "tags": "Graph, Reverse reachability",
    "context": "Water moves from a cell to an equal-or-lower four-direction neighbor. Top/left borders meet the Pacific; bottom/right meet the Atlantic. Return all cells that can drain to both.",
    "examples": "[[1,2],[4,3]] => [0,1], [1,0], [1,1] reach both oceans.",
    "solution": "Reverse the flow: flood inland from each ocean through equal-or-higher heights. Intersect the two reachable sets. Reverse paths correspond exactly to valid downhill drainage paths.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "In the reversed traversal, compare neighbor >= current; using <= explores the wrong direction.",
    "followUp": "How would you support a third coastline or reservoir?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> pacificAtlantic(int[][] h) {\n        int m = h.length,\n            n = h[0].length;\n        boolean[][] p = new boolean[m][n],\n            a = new boolean[m][n];\n        Queue<Integer> pq = new ArrayDeque<>(),\n            aq = new ArrayDeque<>();\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) {\n            if (r == 0 || c == 0) {\n                p[r][c] = true;\n                pq.add(r * n + c);\n            }\n            if (r == m - 1 || c == n - 1) {\n                a[r][c] = true;\n                aq.add(r * n + c);\n            }\n        }\n        flood(h, p, pq);\n        flood(h, a, aq);\n        List<List<Integer>> ans = new ArrayList<>();\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (\n            p[r][c] && a[r][c]\n        ) ans.add(List.of(r, c));\n        return ans;\n    }\n\n    private void flood(int[][] h, boolean[][] seen, Queue<Integer> q) {\n        int m = h.length,\n            n = h[0].length;\n        int[] d = { 1, 0, -1, 0, 1 };\n        while (!q.isEmpty()) {\n            int u = q.remove(),\n                r = u / n,\n                c = u % n;\n            for (int k = 0; k < 4; k++) {\n                int x = r + d[k],\n                    y = c + d[k + 1];\n                if (\n                    x >= 0 &&\n                    x < m &&\n                    y >= 0 &&\n                    y < n &&\n                    !seen[x][y] &&\n                    h[x][y] >= h[r][c]\n                ) {\n                    seen[x][y] = true;\n                    q.add(x * n + y);\n                }\n            }\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Pacific Atlantic Water Flow: what state or invariant makes the solution work?",
        "back": "Reverse the flow: flood inland from each ocean through equal-or-higher heights. Intersect the two reachable sets. Reverse paths correspond exactly to valid downhill drainage paths."
      },
      {
        "type": "Edge case",
        "front": "Pacific Atlantic Water Flow: what implementation trap should you check before submitting?",
        "back": "In the reversed traversal, compare neighbor >= current; using <= explores the wrong direction."
      },
      {
        "type": "Complexity",
        "front": "Pacific Atlantic Water Flow: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Pacific Atlantic Water Flow: trace this case without running code: [[1,2],[4,3]] ",
        "back": "[[1,2],[4,3]] => [0,1], [1,0], [1,1] reach both oceans."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.pacificAtlantic(new int[][]{{1,2},{4,3}}).size()!=3)throw new AssertionError();if(!s.pacificAtlantic(new int[][]{{9}}).equals(List.of(List.of(0,0))))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
  },
  {
    "id": "lc-695",
    "number": 695,
    "title": "Max Area of Island",
    "slug": "max-area-of-island",
    "difficulty": "Medium",
    "tags": "Graph, Flood fill",
    "context": "A nonempty rectangular zero/one grid represents water/land. Return the largest four-direction land-component size, or zero if no land exists. The grid may be modified.",
    "examples": "[[1,1,0],[0,1,0],[1,0,1]] => 3.",
    "solution": "Flood each unseen land component, counting removed land cells. Track the maximum component count. Mark on enqueue to count each cell once.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "Diagonal cells belong to separate components unless connected through side neighbors.",
    "followUp": "How would you also report the component’s bounding rectangle?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxAreaOfIsland(int[][] g) {\n        int m = g.length,\n            n = g[0].length,\n            ans = 0;\n        int[] d = { 1, 0, -1, 0, 1 };\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (\n            g[r][c] == 1\n        ) {\n            Queue<Integer> q = new ArrayDeque<>();\n            q.add(r * n + c);\n            g[r][c] = 0;\n            int area = 0;\n            while (!q.isEmpty()) {\n                int u = q.remove();\n                area++;\n                for (int k = 0; k < 4; k++) {\n                    int x = u / n + d[k],\n                        y = (u % n) + d[k + 1];\n                    if (x >= 0 && x < m && y >= 0 && y < n && g[x][y] == 1) {\n                        g[x][y] = 0;\n                        q.add(x * n + y);\n                    }\n                }\n            }\n            ans = Math.max(ans, area);\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Max Area of Island: what state or invariant makes the solution work?",
        "back": "Flood each unseen land component, counting removed land cells. Track the maximum component count. Mark on enqueue to count each cell once."
      },
      {
        "type": "Edge case",
        "front": "Max Area of Island: what implementation trap should you check before submitting?",
        "back": "Diagonal cells belong to separate components unless connected through side neighbors."
      },
      {
        "type": "Complexity",
        "front": "Max Area of Island: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Max Area of Island: trace this case without running code: [[1,1,0],[0,1,0],[1,0,1]] ",
        "back": "[[1,1,0],[0,1,0],[1,0,1]] => 3."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxAreaOfIsland(new int[][]{{1,1,0},{0,1,0},{1,0,1}})!=3)throw new AssertionError();if(s.maxAreaOfIsland(new int[][]{{0}})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/max-area-of-island/"
  },
  {
    "id": "lc-463",
    "number": 463,
    "title": "Island Perimeter",
    "slug": "island-perimeter",
    "difficulty": "Easy",
    "tags": "Grid, Counting",
    "context": "A rectangular binary grid has one four-direction island without internal lakes. Return its perimeter, counting land edges adjacent to water or outside the grid.",
    "examples": "[[1,1]] => 6: eight initial sides minus two sides at the shared edge.",
    "solution": "Add four for each land cell, then subtract two for each land neighbor above or to the left. Each shared edge is seen once and removes two exposed sides.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(1)",
    "pitfall": "If you inspect all four neighbors, subtract one per shared side rather than two, or edges are double-subtracted.",
    "followUp": "Would the same formula include shorelines around internal lakes?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int islandPerimeter(int[][] g) {\n        int ans = 0;\n        for (int r = 0; r < g.length; r++) for (\n            int c = 0;\n            c < g[0].length;\n            c++\n        ) if (g[r][c] == 1) {\n            ans += 4;\n            if (r > 0 && g[r - 1][c] == 1) ans -= 2;\n            if (c > 0 && g[r][c - 1] == 1) ans -= 2;\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Island Perimeter: what state or invariant makes the solution work?",
        "back": "Add four for each land cell, then subtract two for each land neighbor above or to the left. Each shared edge is seen once and removes two exposed sides."
      },
      {
        "type": "Edge case",
        "front": "Island Perimeter: what implementation trap should you check before submitting?",
        "back": "If you inspect all four neighbors, subtract one per shared side rather than two, or edges are double-subtracted."
      },
      {
        "type": "Complexity",
        "front": "Island Perimeter: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Island Perimeter: trace this case without running code: [[1,1]] ",
        "back": "[[1,1]] => 6: eight initial sides minus two sides at the shared edge."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.islandPerimeter(new int[][]{{1,1}})!=6)throw new AssertionError();if(s.islandPerimeter(new int[][]{{1}})!=4)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/island-perimeter/"
  },
  {
    "id": "lc-17",
    "number": 17,
    "title": "Letter Combinations of a Phone Number",
    "slug": "letter-combinations-of-a-phone-number",
    "difficulty": "Medium",
    "tags": "Backtracking, Cartesian product",
    "context": "Given digits 2..9, return every letter string produced by choosing one keypad letter per digit. Empty input returns an empty list.",
    "examples": "digits=\"27\" => 12 results, from ap through cs; empty digits => [].",
    "solution": "At position i choose each letter mapped to digit i, recurse, then remove it. A full-length path contains exactly one choice for every position.",
    "timeComplexity": "O(L * 4^L)",
    "spaceComplexity": "O(L) working space plus output",
    "pitfall": "Empty digits have no combinations in this API, not a list containing the empty string.",
    "followUp": "How would you stream combinations instead of storing all of them?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    private final String[] keys = {\n        \"\",\n        \"\",\n        \"abc\",\n        \"def\",\n        \"ghi\",\n        \"jkl\",\n        \"mno\",\n        \"pqrs\",\n        \"tuv\",\n        \"wxyz\",\n    };\n\n    public List<String> letterCombinations(String digits) {\n        List<String> ans = new ArrayList<>();\n        if (!digits.isEmpty()) dfs(digits, 0, new StringBuilder(), ans);\n        return ans;\n    }\n\n    private void dfs(String d, int i, StringBuilder p, List<String> a) {\n        if (i == d.length()) {\n            a.add(p.toString());\n            return;\n        }\n        for (char c : keys[d.charAt(i) - '0'].toCharArray()) {\n            p.append(c);\n            dfs(d, i + 1, p, a);\n            p.deleteCharAt(p.length() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Letter Combinations of a Phone Number: what state or invariant makes the solution work?",
        "back": "At position i choose each letter mapped to digit i, recurse, then remove it. A full-length path contains exactly one choice for every position."
      },
      {
        "type": "Edge case",
        "front": "Letter Combinations of a Phone Number: what implementation trap should you check before submitting?",
        "back": "Empty digits have no combinations in this API, not a list containing the empty string."
      },
      {
        "type": "Complexity",
        "front": "Letter Combinations of a Phone Number: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(L * 4^L). Space: O(L) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Letter Combinations of a Phone Number: trace this case without running code: digits=\"27\" ",
        "back": "digits=\"27\" => 12 results, from ap through cs; empty digits => []."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.letterCombinations(\"27\");if(a.size()!=12||!a.contains(\"cs\"))throw new AssertionError();if(!s.letterCombinations(\"\").isEmpty())throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
  },
  {
    "id": "lc-39",
    "number": 39,
    "title": "Combination Sum",
    "slug": "combination-sum",
    "difficulty": "Medium",
    "tags": "Backtracking, Unbounded choices",
    "context": "Distinct positive candidates may be reused any number of times. Return unique combinations summing to a positive target; combination order does not matter.",
    "examples": "candidates=[2,5], target=7 => [[2,5]]; target=3 => [].",
    "solution": "Sort candidates and recurse with a minimum allowed index. Choosing i recurses at i again to allow reuse. Nondecreasing choices give one canonical ordering per combination.",
    "timeComplexity": "O(n^(T/min + 1)) coarse upper bound, plus output",
    "spaceComplexity": "O(T/min) recursion plus output",
    "pitfall": "Use index i for reuse; i+1 would silently change the problem to single-use candidates.",
    "followUp": "What pruning relies on candidates being strictly positive?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> combinationSum(int[] a, int target) {\n        Arrays.sort(a);\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(a, 0, target, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int[] a,\n        int start,\n        int left,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (left == 0) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int i = start; i < a.length && a[i] <= left; i++) {\n            p.add(a[i]);\n            dfs(a, i, left - a[i], p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Combination Sum: what state or invariant makes the solution work?",
        "back": "Sort candidates and recurse with a minimum allowed index. Choosing i recurses at i again to allow reuse. Nondecreasing choices give one canonical ordering per combination."
      },
      {
        "type": "Edge case",
        "front": "Combination Sum: what implementation trap should you check before submitting?",
        "back": "Use index i for reuse; i+1 would silently change the problem to single-use candidates."
      },
      {
        "type": "Complexity",
        "front": "Combination Sum: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n^(T/min + 1)) coarse upper bound, plus output. Space: O(T/min) recursion plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Combination Sum: trace this case without running code: candidates=[2,5], target=7 ",
        "back": "candidates=[2,5], target=7 => [[2,5]]; target=3 => []."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.combinationSum(new int[]{2,5},7).equals(List.of(List.of(2,5))))throw new AssertionError();if(!s.combinationSum(new int[]{2,5},3).isEmpty())throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/combination-sum/"
  },
  {
    "id": "lc-40",
    "number": 40,
    "title": "Combination Sum II",
    "slug": "combination-sum-ii",
    "difficulty": "Medium",
    "tags": "Backtracking, Duplicate handling",
    "context": "Candidates may repeat, but each array position can be used at most once. Return unique value combinations summing to the positive target.",
    "examples": "[1,1,2], target=2 => [[1,1],[2]], each once.",
    "solution": "Sort, advance to i+1 after choosing an element, and skip equal values only among siblings at the same recursion depth. This removes duplicate combinations while allowing repeated values from distinct positions.",
    "timeComplexity": "O(n * 2^n)",
    "spaceComplexity": "O(n) working space plus output",
    "pitfall": "The duplicate check is i>start, not i>0; otherwise a valid pair of equal numbers is forbidden.",
    "followUp": "Compare the recursion state with unlimited reuse in Combination Sum.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> combinationSum2(int[] a, int target) {\n        Arrays.sort(a);\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(a, 0, target, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int[] a,\n        int start,\n        int left,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (left == 0) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int i = start; i < a.length && a[i] <= left; i++) {\n            if (i > start && a[i] == a[i - 1]) continue;\n            p.add(a[i]);\n            dfs(a, i + 1, left - a[i], p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Combination Sum II: what state or invariant makes the solution work?",
        "back": "Sort, advance to i+1 after choosing an element, and skip equal values only among siblings at the same recursion depth. This removes duplicate combinations while allowing repeated values from distinct positions."
      },
      {
        "type": "Edge case",
        "front": "Combination Sum II: what implementation trap should you check before submitting?",
        "back": "The duplicate check is i>start, not i>0; otherwise a valid pair of equal numbers is forbidden."
      },
      {
        "type": "Complexity",
        "front": "Combination Sum II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * 2^n). Space: O(n) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Combination Sum II: trace this case without running code: [1,1,2], target=2 ",
        "back": "[1,1,2], target=2 => [[1,1],[2]], each once."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.combinationSum2(new int[]{1,1,2},2);if(a.size()!=2||!a.contains(List.of(1,1))||!a.contains(List.of(2)))throw new AssertionError();if(!s.combinationSum2(new int[]{3},2).isEmpty())throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/combination-sum-ii/"
  },
  {
    "id": "lc-46",
    "number": 46,
    "title": "Permutations",
    "slug": "permutations",
    "difficulty": "Medium",
    "tags": "Backtracking, Permutations",
    "context": "Return every ordering of an array of distinct integers. Each input element must appear exactly once in each result.",
    "examples": "[4,7] => [[4,7],[7,4]]; [4] => [[4]].",
    "solution": "Track used indices and choose any unused element for the next slot. Backtrack the chosen index and copy the completed path; each root-to-leaf path is one permutation.",
    "timeComplexity": "O(n * n!)",
    "spaceComplexity": "O(n) working space plus output",
    "pitfall": "Store a copy of each full path; storing the mutable path itself corrupts all results.",
    "followUp": "Can you generate permutations in place with swaps?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> permute(int[] a) {\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(a, new boolean[a.length], new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int[] a,\n        boolean[] used,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (p.size() == a.length) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int i = 0; i < a.length; i++) if (!used[i]) {\n            used[i] = true;\n            p.add(a[i]);\n            dfs(a, used, p, ans);\n            p.remove(p.size() - 1);\n            used[i] = false;\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Permutations: what state or invariant makes the solution work?",
        "back": "Track used indices and choose any unused element for the next slot. Backtrack the chosen index and copy the completed path; each root-to-leaf path is one permutation."
      },
      {
        "type": "Edge case",
        "front": "Permutations: what implementation trap should you check before submitting?",
        "back": "Store a copy of each full path; storing the mutable path itself corrupts all results."
      },
      {
        "type": "Complexity",
        "front": "Permutations: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * n!). Space: O(n) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Permutations: trace this case without running code: [4,7] ",
        "back": "[4,7] => [[4,7],[7,4]]; [4] => [[4]]."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.permute(new int[]{4,7});if(a.size()!=2||!a.contains(List.of(7,4)))throw new AssertionError();if(!s.permute(new int[]{4}).equals(List.of(List.of(4))))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/permutations/"
  },
  {
    "id": "lc-47",
    "number": 47,
    "title": "Permutations II",
    "slug": "permutations-ii",
    "difficulty": "Medium",
    "tags": "Backtracking, Duplicate handling",
    "context": "Return distinct permutations of an integer array that may contain duplicate values. Every position is used exactly once.",
    "examples": "[1,1,2] => three distinct orderings; [2,2] => one.",
    "solution": "Sort and track used positions. Skip a duplicate value when its previous equal position is unused, enforcing a canonical order among indistinguishable copies at each depth.",
    "timeComplexity": "O(n * n!) upper bound",
    "spaceComplexity": "O(n) working space plus output",
    "pitfall": "The duplicate guard checks !used[i-1]; equal values already on the current path must remain selectable.",
    "followUp": "How would a value-to-count map express the same search?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> permuteUnique(int[] a) {\n        Arrays.sort(a);\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(a, new boolean[a.length], new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int[] a,\n        boolean[] used,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (p.size() == a.length) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int i = 0; i < a.length; i++) {\n            if (\n                used[i] || (i > 0 && a[i] == a[i - 1] && !used[i - 1])\n            ) continue;\n            used[i] = true;\n            p.add(a[i]);\n            dfs(a, used, p, ans);\n            p.remove(p.size() - 1);\n            used[i] = false;\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Permutations II: what state or invariant makes the solution work?",
        "back": "Sort and track used positions. Skip a duplicate value when its previous equal position is unused, enforcing a canonical order among indistinguishable copies at each depth."
      },
      {
        "type": "Edge case",
        "front": "Permutations II: what implementation trap should you check before submitting?",
        "back": "The duplicate guard checks !used[i-1]; equal values already on the current path must remain selectable."
      },
      {
        "type": "Complexity",
        "front": "Permutations II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * n!) upper bound. Space: O(n) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Permutations II: trace this case without running code: [1,1,2] ",
        "back": "[1,1,2] => three distinct orderings; [2,2] => one."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.permuteUnique(new int[]{1,1,2});if(a.size()!=3||new HashSet<>(a).size()!=3)throw new AssertionError();if(!s.permuteUnique(new int[]{2,2}).equals(List.of(List.of(2,2))))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/permutations-ii/"
  },
  {
    "id": "lc-77",
    "number": 77,
    "title": "Combinations",
    "slug": "combinations",
    "difficulty": "Medium",
    "tags": "Backtracking, Combinations",
    "context": "Return all subsets of size k chosen from integers 1..n. Order within a combination and output order are not significant.",
    "examples": "n=4,k=2 => six pairs; n=3,k=3 => [[1,2,3]].",
    "solution": "Build strictly increasing choices. If need positions remain, the next value cannot exceed n-need+1; pruning this bound avoids branches with too few remaining values.",
    "timeComplexity": "O(k * C(n,k))",
    "spaceComplexity": "O(k) working space plus output",
    "pitfall": "Advance the start index after selection; choosing from 1 each time produces permutations and duplicates.",
    "followUp": "How would you return only the lexicographically r-th combination?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> combine(int n, int k) {\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(1, n, k, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int start,\n        int n,\n        int need,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (need == 0) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int x = start; x <= n - need + 1; x++) {\n            p.add(x);\n            dfs(x + 1, n, need - 1, p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Combinations: what state or invariant makes the solution work?",
        "back": "Build strictly increasing choices. If need positions remain, the next value cannot exceed n-need+1; pruning this bound avoids branches with too few remaining values."
      },
      {
        "type": "Edge case",
        "front": "Combinations: what implementation trap should you check before submitting?",
        "back": "Advance the start index after selection; choosing from 1 each time produces permutations and duplicates."
      },
      {
        "type": "Complexity",
        "front": "Combinations: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(k * C(n,k)). Space: O(k) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Combinations: trace this case without running code: n=4,k=2 ",
        "back": "n=4,k=2 => six pairs; n=3,k=3 => [[1,2,3]]."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.combine(4,2).size()!=6)throw new AssertionError();if(!s.combine(3,3).equals(List.of(List.of(1,2,3))))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/combinations/"
  },
  {
    "id": "lc-78",
    "number": 78,
    "title": "Subsets",
    "slug": "subsets",
    "difficulty": "Medium",
    "tags": "Backtracking, Power set",
    "context": "Return all subsets of an array of distinct integers, including the empty subset and the whole array.",
    "examples": "[2,5] => [],[2],[5],[2,5], four subsets.",
    "solution": "Record the current path at every recursion node. Append only later indices so each subset is represented in input order exactly once.",
    "timeComplexity": "O(n * 2^n)",
    "spaceComplexity": "O(n) working space plus output",
    "pitfall": "Record the empty path before exploring; subsets are valid at every depth, not only at leaves.",
    "followUp": "How would bit masks enumerate the same power set?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> subsets(int[] a) {\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(a, 0, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int[] a,\n        int start,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        ans.add(new ArrayList<>(p));\n        for (int i = start; i < a.length; i++) {\n            p.add(a[i]);\n            dfs(a, i + 1, p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Subsets: what state or invariant makes the solution work?",
        "back": "Record the current path at every recursion node. Append only later indices so each subset is represented in input order exactly once."
      },
      {
        "type": "Edge case",
        "front": "Subsets: what implementation trap should you check before submitting?",
        "back": "Record the empty path before exploring; subsets are valid at every depth, not only at leaves."
      },
      {
        "type": "Complexity",
        "front": "Subsets: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * 2^n). Space: O(n) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Subsets: trace this case without running code: [2,5] ",
        "back": "[2,5] => [],[2],[5],[2,5], four subsets."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.subsets(new int[]{2,5});if(a.size()!=4||!a.contains(List.of())||!a.contains(List.of(2,5)))throw new AssertionError();if(s.subsets(new int[]{7}).size()!=2)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/subsets/"
  },
  {
    "id": "lc-90",
    "number": 90,
    "title": "Subsets II",
    "slug": "subsets-ii",
    "difficulty": "Medium",
    "tags": "Backtracking, Duplicate handling",
    "context": "Return unique subsets of an integer array that may contain duplicate values. The empty subset is included.",
    "examples": "[2,2] => [],[2],[2,2]; duplicate singleton results are omitted.",
    "solution": "Sort the array. Record each path and skip equal values only when they would begin sibling branches at the same depth. Deeper equal values remain allowed.",
    "timeComplexity": "O(n * 2^n) upper bound",
    "spaceComplexity": "O(n) working space plus output",
    "pitfall": "Deduplicate sibling choices, not all occurrences of a number globally.",
    "followUp": "Derive the number of unique subsets from the frequency of each distinct value.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> subsetsWithDup(int[] a) {\n        Arrays.sort(a);\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(a, 0, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int[] a,\n        int start,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        ans.add(new ArrayList<>(p));\n        for (int i = start; i < a.length; i++) {\n            if (i > start && a[i] == a[i - 1]) continue;\n            p.add(a[i]);\n            dfs(a, i + 1, p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Subsets II: what state or invariant makes the solution work?",
        "back": "Sort the array. Record each path and skip equal values only when they would begin sibling branches at the same depth. Deeper equal values remain allowed."
      },
      {
        "type": "Edge case",
        "front": "Subsets II: what implementation trap should you check before submitting?",
        "back": "Deduplicate sibling choices, not all occurrences of a number globally."
      },
      {
        "type": "Complexity",
        "front": "Subsets II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * 2^n) upper bound. Space: O(n) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Subsets II: trace this case without running code: [2,2] ",
        "back": "[2,2] => [],[2],[2,2]; duplicate singleton results are omitted."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.subsetsWithDup(new int[]{2,2});if(a.size()!=3||!a.contains(List.of(2,2)))throw new AssertionError();if(s.subsetsWithDup(new int[]{1,2,2}).size()!=6)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/subsets-ii/"
  },
  {
    "id": "lc-79",
    "number": 79,
    "title": "Word Search",
    "slug": "word-search",
    "difficulty": "Medium",
    "tags": "Backtracking, Grid",
    "context": "Given a letter grid and a nonempty word, return whether a four-direction path spells the word without reusing any cell. The grid must be restored after the search.",
    "examples": "board=[AB], word=AB => true; word=ABA => false because A cannot be reused.",
    "solution": "Try each matching start. During DFS temporarily mark the current cell, search the next letter in four directions, and restore the cell on every return. The marked path enforces no reuse.",
    "timeComplexity": "O(rows * cols * 4^L) upper bound",
    "spaceComplexity": "O(L) recursion",
    "pitfall": "Restore the cell even when a successful recursive branch is found, so later callers see the original board.",
    "followUp": "Prune with letter counts or start from the rarer end of the word.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean exist(char[][] b, String w) {\n        for (int r = 0; r < b.length; r++) for (\n            int c = 0;\n            c < b[0].length;\n            c++\n        ) if (dfs(b, w, r, c, 0)) return true;\n        return false;\n    }\n\n    private boolean dfs(char[][] b, String w, int r, int c, int i) {\n        if (i == w.length()) return true;\n        if (\n            r < 0 ||\n            r >= b.length ||\n            c < 0 ||\n            c >= b[0].length ||\n            b[r][c] != w.charAt(i)\n        ) return false;\n        char old = b[r][c];\n        b[r][c] = '#';\n        boolean ok =\n            dfs(b, w, r + 1, c, i + 1) ||\n            dfs(b, w, r - 1, c, i + 1) ||\n            dfs(b, w, r, c + 1, i + 1) ||\n            dfs(b, w, r, c - 1, i + 1);\n        b[r][c] = old;\n        return ok;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Word Search: what state or invariant makes the solution work?",
        "back": "Try each matching start. During DFS temporarily mark the current cell, search the next letter in four directions, and restore the cell on every return. The marked path enforces no reuse."
      },
      {
        "type": "Edge case",
        "front": "Word Search: what implementation trap should you check before submitting?",
        "back": "Restore the cell even when a successful recursive branch is found, so later callers see the original board."
      },
      {
        "type": "Complexity",
        "front": "Word Search: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols * 4^L) upper bound. Space: O(L) recursion. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Word Search: trace this case without running code: board=[AB], word=AB ",
        "back": "board=[AB], word=AB => true; word=ABA => false because A cannot be reused."
      }
    ],
    "testCode": "Solution s = new Solution();\nchar[][] a={{'A','B'}};if(!s.exist(a,\"AB\")||a[0][0]!='A')throw new AssertionError();if(s.exist(a,\"ABA\"))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/word-search/"
  },
  {
    "id": "lc-131",
    "number": 131,
    "title": "Palindrome Partitioning",
    "slug": "palindrome-partitioning",
    "difficulty": "Medium",
    "tags": "Backtracking, Dynamic programming",
    "context": "Split a nonempty string into contiguous pieces so every piece reads the same forward and backward. Return all valid partitions.",
    "examples": "\"aba\" => [a,b,a] and [aba].",
    "solution": "Precompute palindrome intervals using equal endpoints and the inner interval. Backtrack over every palindromic prefix of the remaining suffix; copied paths partition the entire string.",
    "timeComplexity": "O(n² + n * 2^n)",
    "spaceComplexity": "O(n²) working space plus output",
    "pitfall": "A partition must cover every character exactly once; a collection of palindromic subsequences is a different problem.",
    "followUp": "How would you find the minimum number of cuts instead of all partitions?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<String>> partition(String s) {\n        int n = s.length();\n        boolean[][] pal = new boolean[n][n];\n        for (int i = n - 1; i >= 0; i--) for (int j = i; j < n; j++) pal[i][j] =\n            s.charAt(i) == s.charAt(j) && (j - i < 2 || pal[i + 1][j - 1]);\n        List<List<String>> ans = new ArrayList<>();\n        dfs(s, 0, pal, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        String s,\n        int start,\n        boolean[][] pal,\n        List<String> p,\n        List<List<String>> ans\n    ) {\n        if (start == s.length()) {\n            ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int end = start; end < s.length(); end++) if (pal[start][end]) {\n            p.add(s.substring(start, end + 1));\n            dfs(s, end + 1, pal, p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Palindrome Partitioning: what state or invariant makes the solution work?",
        "back": "Precompute palindrome intervals using equal endpoints and the inner interval. Backtrack over every palindromic prefix of the remaining suffix; copied paths partition the entire string."
      },
      {
        "type": "Edge case",
        "front": "Palindrome Partitioning: what implementation trap should you check before submitting?",
        "back": "A partition must cover every character exactly once; a collection of palindromic subsequences is a different problem."
      },
      {
        "type": "Complexity",
        "front": "Palindrome Partitioning: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n² + n * 2^n). Space: O(n²) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Palindrome Partitioning: trace this case without running code: \"aba\" ",
        "back": "\"aba\" => [a,b,a] and [aba]."
      }
    ],
    "testCode": "Solution s = new Solution();\nvar a=s.partition(\"aba\");if(a.size()!=2||!a.contains(List.of(\"aba\")))throw new AssertionError();if(!s.partition(\"ab\").equals(List.of(List.of(\"a\",\"b\"))))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/palindrome-partitioning/"
  },
  {
    "id": "lc-51",
    "number": 51,
    "title": "N-Queens",
    "slug": "nqueens",
    "difficulty": "Hard",
    "tags": "Backtracking, Constraint search",
    "context": "Place n queens on an n by n board so none share a row, column, or diagonal. Return every board using Q for queens and dots for empty cells.",
    "examples": "n=1 => [[Q]]; n=2 => no boards.",
    "solution": "Place one queen per row. Track occupied columns and the diagonals r+c and r-c+n-1. Each placement preserves nonattacking constraints; undo all marks on backtracking.",
    "timeComplexity": "O(n * n! + S * n²), S=number of solutions",
    "spaceComplexity": "O(n²) working board plus output",
    "pitfall": "Offset r-c before using it as an array index; both diagonal arrays need 2n-1 positions.",
    "followUp": "How can bit masks replace the three occupancy arrays?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> ans = new ArrayList<>();\n        char[][] b = new char[n][n];\n        for (char[] row : b) Arrays.fill(row, '.');\n        dfs(0, b, new boolean[n], new boolean[2 * n], new boolean[2 * n], ans);\n        return ans;\n    }\n\n    private void dfs(\n        int r,\n        char[][] b,\n        boolean[] col,\n        boolean[] d1,\n        boolean[] d2,\n        List<List<String>> ans\n    ) {\n        int n = b.length;\n        if (r == n) {\n            List<String> out = new ArrayList<>();\n            for (char[] row : b) out.add(new String(row));\n            ans.add(out);\n            return;\n        }\n        for (int c = 0; c < n; c++) if (\n            !col[c] && !d1[r + c] && !d2[r - c + n - 1]\n        ) {\n            col[c] = d1[r + c] = d2[r - c + n - 1] = true;\n            b[r][c] = 'Q';\n            dfs(r + 1, b, col, d1, d2, ans);\n            b[r][c] = '.';\n            col[c] = d1[r + c] = d2[r - c + n - 1] = false;\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "N-Queens: what state or invariant makes the solution work?",
        "back": "Place one queen per row. Track occupied columns and the diagonals r+c and r-c+n-1. Each placement preserves nonattacking constraints; undo all marks on backtracking."
      },
      {
        "type": "Edge case",
        "front": "N-Queens: what implementation trap should you check before submitting?",
        "back": "Offset r-c before using it as an array index; both diagonal arrays need 2n-1 positions."
      },
      {
        "type": "Complexity",
        "front": "N-Queens: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * n! + S * n²), S=number of solutions. Space: O(n²) working board plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "N-Queens: trace this case without running code: n=1 ",
        "back": "n=1 => [[Q]]; n=2 => no boards."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.solveNQueens(1).equals(List.of(List.of(\"Q\"))))throw new AssertionError();if(!s.solveNQueens(2).isEmpty()||s.solveNQueens(4).size()!=2)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/nqueens/"
  },
  {
    "id": "lc-52",
    "number": 52,
    "title": "N-Queens II",
    "slug": "nqueens-ii",
    "difficulty": "Hard",
    "tags": "Backtracking, Bitmask",
    "context": "Count nonattacking arrangements of n queens on an n by n board; unlike N-Queens, board strings are not required. The problem bounds n at 9.",
    "examples": "n=1 => 1 arrangement; n=4 => 2.",
    "solution": "Track occupied columns and diagonal attacks for the current row in bit masks. Available bits are the board mask minus attacks. Isolate one low bit, recurse with shifted diagonal masks, and sum complete placements.",
    "timeComplexity": "O(n!) upper bound",
    "spaceComplexity": "O(n) recursion",
    "pitfall": "Mask available columns to n bits, and use an unsigned right shift for the right-going attack mask.",
    "followUp": "Can symmetry around the central column reduce the first-row search?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int totalNQueens(int n) {\n        return count((1 << n) - 1, 0, 0, 0);\n    }\n\n    private int count(int mask, int cols, int left, int right) {\n        if (cols == mask) return 1;\n        int free = mask & ~(cols | left | right),\n            ans = 0;\n        while (free != 0) {\n            int bit = free & -free;\n            free -= bit;\n            ans += count(\n                mask,\n                cols | bit,\n                (left | bit) << 1,\n                (right | bit) >>> 1\n            );\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "N-Queens II: what state or invariant makes the solution work?",
        "back": "Track occupied columns and diagonal attacks for the current row in bit masks. Available bits are the board mask minus attacks. Isolate one low bit, recurse with shifted diagonal masks, and sum complete placements."
      },
      {
        "type": "Edge case",
        "front": "N-Queens II: what implementation trap should you check before submitting?",
        "back": "Mask available columns to n bits, and use an unsigned right shift for the right-going attack mask."
      },
      {
        "type": "Complexity",
        "front": "N-Queens II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n!) upper bound. Space: O(n) recursion. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "N-Queens II: trace this case without running code: n=1 ",
        "back": "n=1 => 1 arrangement; n=4 => 2."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.totalNQueens(1)!=1)throw new AssertionError();if(s.totalNQueens(4)!=2||s.totalNQueens(2)!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/nqueens-ii/"
  },
  {
    "id": "lc-216",
    "number": 216,
    "title": "Combination Sum III",
    "slug": "combination-sum-iii",
    "difficulty": "Medium",
    "tags": "Backtracking, Combinations",
    "context": "Choose exactly k distinct digits from 1..9 whose sum equals n. Return all combinations, using each digit at most once.",
    "examples": "k=3,n=6 => [[1,2,3]]; k=2,n=2 => [].",
    "solution": "Build increasing digits while tracking remaining count and sum. Emit only when both reach zero. Positivity allows stopping when the candidate exceeds the remaining sum.",
    "timeComplexity": "O(k * C(9,k)) output-scale bound",
    "spaceComplexity": "O(k) working space plus output",
    "pitfall": "Reaching the sum with too few digits is not sufficient; enforce exactly k choices.",
    "followUp": "Add lower and upper bounds on the sum achievable by the remaining digits.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public List<List<Integer>> combinationSum3(int k, int n) {\n        List<List<Integer>> ans = new ArrayList<>();\n        dfs(1, k, n, new ArrayList<>(), ans);\n        return ans;\n    }\n\n    private void dfs(\n        int start,\n        int k,\n        int left,\n        List<Integer> p,\n        List<List<Integer>> ans\n    ) {\n        if (k == 0) {\n            if (left == 0) ans.add(new ArrayList<>(p));\n            return;\n        }\n        for (int x = start; x <= 9 - k + 1 && x <= left; x++) {\n            p.add(x);\n            dfs(x + 1, k - 1, left - x, p, ans);\n            p.remove(p.size() - 1);\n        }\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Combination Sum III: what state or invariant makes the solution work?",
        "back": "Build increasing digits while tracking remaining count and sum. Emit only when both reach zero. Positivity allows stopping when the candidate exceeds the remaining sum."
      },
      {
        "type": "Edge case",
        "front": "Combination Sum III: what implementation trap should you check before submitting?",
        "back": "Reaching the sum with too few digits is not sufficient; enforce exactly k choices."
      },
      {
        "type": "Complexity",
        "front": "Combination Sum III: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(k * C(9,k)) output-scale bound. Space: O(k) working space plus output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Combination Sum III: trace this case without running code: k=3,n=6 ",
        "back": "k=3,n=6 => [[1,2,3]]; k=2,n=2 => []."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.combinationSum3(3,6).equals(List.of(List.of(1,2,3))))throw new AssertionError();if(!s.combinationSum3(2,2).isEmpty())throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/combination-sum-iii/"
  },
  {
    "id": "lc-70",
    "number": 70,
    "title": "Climbing Stairs",
    "slug": "climbing-stairs",
    "difficulty": "Easy",
    "tags": "Dynamic programming, Fibonacci",
    "context": "A staircase has n positive steps. Each move climbs one or two steps. Return the number of different ordered move sequences reaching the top.",
    "examples": "n=4 => 5: 1111,112,121,211,22.",
    "solution": "The last move comes from step n-1 or n-2, disjoint cases, so ways[n]=ways[n-1]+ways[n-2]. Keep only those two predecessor counts.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Count ordered sequences, not unordered combinations of one-step and two-step moves.",
    "followUp": "How would matrix exponentiation handle extremely large n modulo a prime?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int climbStairs(int n) {\n        int a = 1,\n            b = 1;\n        for (int i = 2; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Climbing Stairs: what state or invariant makes the solution work?",
        "back": "The last move comes from step n-1 or n-2, disjoint cases, so ways[n]=ways[n-1]+ways[n-2]. Keep only those two predecessor counts."
      },
      {
        "type": "Edge case",
        "front": "Climbing Stairs: what implementation trap should you check before submitting?",
        "back": "Count ordered sequences, not unordered combinations of one-step and two-step moves."
      },
      {
        "type": "Complexity",
        "front": "Climbing Stairs: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Climbing Stairs: trace this case without running code: n=4 ",
        "back": "n=4 => 5: 1111,112,121,211,22."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.climbStairs(4)!=5)throw new AssertionError();if(s.climbStairs(1)!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    "id": "lc-198",
    "number": 198,
    "title": "House Robber",
    "slug": "house-robber",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Take or skip",
    "context": "Given nonnegative money in houses along a line, return the largest amount obtainable without choosing adjacent houses.",
    "examples": "[4,1,5] => 9 by choosing the first and last houses; [0] => 0.",
    "solution": "At each house choose between skipping it (best through previous house) and taking it (value plus best through two houses back). The two stored states summarize all legal prefixes.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Update both states from old values; overwriting the two-back state too early can combine adjacent houses.",
    "followUp": "How would you reconstruct the chosen house indices?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int rob(int[] nums) {\n        int prev2 = 0,\n            prev1 = 0;\n        for (int x : nums) {\n            int cur = Math.max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = cur;\n        }\n        return prev1;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "House Robber: what state or invariant makes the solution work?",
        "back": "At each house choose between skipping it (best through previous house) and taking it (value plus best through two houses back). The two stored states summarize all legal prefixes."
      },
      {
        "type": "Edge case",
        "front": "House Robber: what implementation trap should you check before submitting?",
        "back": "Update both states from old values; overwriting the two-back state too early can combine adjacent houses."
      },
      {
        "type": "Complexity",
        "front": "House Robber: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "House Robber: trace this case without running code: [4,1,5] ",
        "back": "[4,1,5] => 9 by choosing the first and last houses; [0] => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.rob(new int[]{4,1,5})!=9)throw new AssertionError();if(s.rob(new int[]{0})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/house-robber/"
  },
  {
    "id": "lc-213",
    "number": 213,
    "title": "House Robber II",
    "slug": "house-robber-ii",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Circular constraint",
    "context": "Houses form a circle, so the first and last are adjacent. Return the greatest sum from nonadjacent houses with nonnegative values.",
    "examples": "[4,1,5] => 5 because 4 and 5 are adjacent around the circle; [6] => 6.",
    "solution": "Every valid selection excludes either the first house or the last. Solve the two linear ranges and take their maximum; handle the single-house overlap separately.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "A one-element input must return that value; both exclusion ranges would otherwise be empty.",
    "followUp": "How would the state change if houses within distance two also conflicted?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int rob(int[] a) {\n        if (a.length == 1) return a[0];\n        return Math.max(line(a, 0, a.length - 2), line(a, 1, a.length - 1));\n    }\n\n    private int line(int[] a, int lo, int hi) {\n        int p = 0,\n            q = 0;\n        for (int i = lo; i <= hi; i++) {\n            int cur = Math.max(q, p + a[i]);\n            p = q;\n            q = cur;\n        }\n        return q;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "House Robber II: what state or invariant makes the solution work?",
        "back": "Every valid selection excludes either the first house or the last. Solve the two linear ranges and take their maximum; handle the single-house overlap separately."
      },
      {
        "type": "Edge case",
        "front": "House Robber II: what implementation trap should you check before submitting?",
        "back": "A one-element input must return that value; both exclusion ranges would otherwise be empty."
      },
      {
        "type": "Complexity",
        "front": "House Robber II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "House Robber II: trace this case without running code: [4,1,5] ",
        "back": "[4,1,5] => 5 because 4 and 5 are adjacent around the circle; [6] => 6."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.rob(new int[]{4,1,5})!=5)throw new AssertionError();if(s.rob(new int[]{6})!=6)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/house-robber-ii/"
  },
  {
    "id": "lc-322",
    "number": 322,
    "title": "Coin Change",
    "slug": "coin-change",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Unbounded knapsack",
    "context": "Positive coin denominations have unlimited supply. Return the minimum number making an exact nonnegative amount, or -1 when impossible.",
    "examples": "coins=[3,4], amount=6 => 2; amount=5 => -1.",
    "solution": "Let dp[x] be the minimum coins for amount x, with dp[0]=0. For every coin c<=x, extend an optimal solution to x-c. Increasing amounts ensure all predecessors are ready.",
    "timeComplexity": "O(amount * number of coins)",
    "spaceComplexity": "O(amount)",
    "pitfall": "A greedy choice of the largest coin is not generally optimal; use an unreachable sentinel that cannot overflow on +1.",
    "followUp": "Store the last chosen coin to reconstruct one optimal combination.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int x = 1; x <= amount; x++) for (int c : coins)\n            if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Coin Change: what state or invariant makes the solution work?",
        "back": "Let dp[x] be the minimum coins for amount x, with dp[0]=0. For every coin c<=x, extend an optimal solution to x-c. Increasing amounts ensure all predecessors are ready."
      },
      {
        "type": "Edge case",
        "front": "Coin Change: what implementation trap should you check before submitting?",
        "back": "A greedy choice of the largest coin is not generally optimal; use an unreachable sentinel that cannot overflow on +1."
      },
      {
        "type": "Complexity",
        "front": "Coin Change: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(amount * number of coins). Space: O(amount). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Coin Change: trace this case without running code: coins=[3,4], amount=6 ",
        "back": "coins=[3,4], amount=6 => 2; amount=5 => -1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.coinChange(new int[]{3,4},6)!=2)throw new AssertionError();if(s.coinChange(new int[]{3,4},5)!=-1||s.coinChange(new int[]{3},0)!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/coin-change/"
  },
  {
    "id": "lc-518",
    "number": 518,
    "title": "Coin Change II",
    "slug": "coin-change-ii",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Unbounded knapsack",
    "context": "Distinct positive coin denominations can be reused. Count unordered combinations summing to amount; amount zero has one empty combination. The final count fits a signed 32-bit integer.",
    "examples": "coins=[1,3], amount=4 => 2: four ones, or one plus three.",
    "solution": "Initialize ways[0]=1. Process each denomination outside and amounts increasingly inside; ways[x] adds combinations ending with that denomination while preserving a canonical denomination order.",
    "timeComplexity": "O(amount * number of coins)",
    "spaceComplexity": "O(amount)",
    "pitfall": "Putting amounts outside and coins inside counts ordered sequences rather than combinations.",
    "followUp": "How would the recurrence change if each coin were usable once?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int change(int amount, int[] coins) {\n        long[] dp = new long[amount + 1];\n        dp[0] = 1;\n        for (int c : coins)\n            for (int x = c; x <= amount; x++) dp[x] += dp[x - c];\n        return (int) dp[amount];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Coin Change II: what state or invariant makes the solution work?",
        "back": "Initialize ways[0]=1. Process each denomination outside and amounts increasingly inside; ways[x] adds combinations ending with that denomination while preserving a canonical denomination order."
      },
      {
        "type": "Edge case",
        "front": "Coin Change II: what implementation trap should you check before submitting?",
        "back": "Putting amounts outside and coins inside counts ordered sequences rather than combinations."
      },
      {
        "type": "Complexity",
        "front": "Coin Change II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(amount * number of coins). Space: O(amount). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Coin Change II: trace this case without running code: coins=[1,3], amount=4 ",
        "back": "coins=[1,3], amount=4 => 2: four ones, or one plus three."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.change(4,new int[]{1,3})!=2)throw new AssertionError();if(s.change(0,new int[]{2})!=1||s.change(3,new int[]{2})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/coin-change-ii/"
  },
  {
    "id": "lc-300",
    "number": 300,
    "title": "Longest Increasing Subsequence",
    "slug": "longest-increasing-subsequence",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Subsequences",
    "context": "Return the length of a strictly increasing subsequence of an integer array. Chosen elements preserve input order but need not be contiguous.",
    "examples": "[3,1,2,2,4] => 3 using [1,2,4]; equal values cannot extend it.",
    "solution": "Let dp[i] be the longest valid subsequence ending exactly at i. Start at one and extend every earlier j with nums[j]<nums[i]. Taking the maximum covers all possible final indices.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n)",
    "pitfall": "Use a strict comparison; <= solves a nondecreasing variant instead.",
    "followUp": "Derive the O(n log n) minimum-tail representation and explain why tails need not itself be a subsequence.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int lengthOfLIS(int[] a) {\n        int[] dp = new int[a.length];\n        int ans = 0;\n        for (int i = 0; i < a.length; i++) {\n            dp[i] = 1;\n            for (int j = 0; j < i; j++) if (a[j] < a[i]) dp[i] = Math.max(\n                dp[i],\n                dp[j] + 1\n            );\n            ans = Math.max(ans, dp[i]);\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Increasing Subsequence: what state or invariant makes the solution work?",
        "back": "Let dp[i] be the longest valid subsequence ending exactly at i. Start at one and extend every earlier j with nums[j]<nums[i]. Taking the maximum covers all possible final indices."
      },
      {
        "type": "Edge case",
        "front": "Longest Increasing Subsequence: what implementation trap should you check before submitting?",
        "back": "Use a strict comparison; <= solves a nondecreasing variant instead."
      },
      {
        "type": "Complexity",
        "front": "Longest Increasing Subsequence: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Longest Increasing Subsequence: trace this case without running code: [3,1,2,2,4] ",
        "back": "[3,1,2,2,4] => 3 using [1,2,4]; equal values cannot extend it."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.lengthOfLIS(new int[]{3,1,2,2,4})!=3)throw new AssertionError();if(s.lengthOfLIS(new int[]{5,5,5})!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/longest-increasing-subsequence/"
  },
  {
    "id": "lc-1143",
    "number": 1143,
    "title": "Longest Common Subsequence",
    "slug": "longest-common-subsequence",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Two strings",
    "context": "Given two strings, return the length of their longest common subsequence. Characters may be skipped, but relative order must be preserved.",
    "examples": "\"axby\" and \"aby\" => 3 from \"aby\"; \"ab\" and \"cd\" => 0.",
    "solution": "dp[i][j] compares prefixes. Equal final characters extend dp[i-1][j-1]; otherwise discard one final character and take max(dp[i-1][j],dp[i][j-1]).",
    "timeComplexity": "O(mn)",
    "spaceComplexity": "O(mn)",
    "pitfall": "A subsequence need not be contiguous; resetting to zero on a mismatch solves common substring instead.",
    "followUp": "Reconstruct one LCS, then reduce memory when only its length is required.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int longestCommonSubsequence(String a, String b) {\n        int[][] dp = new int[a.length() + 1][b.length() + 1];\n        for (int i = 1; i <= a.length(); i++) for (\n            int j = 1;\n            j <= b.length();\n            j++\n        ) dp[i][j] =\n            a.charAt(i - 1) == b.charAt(j - 1)\n                ? dp[i - 1][j - 1] + 1\n                : Math.max(dp[i - 1][j], dp[i][j - 1]);\n        return dp[a.length()][b.length()];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Common Subsequence: what state or invariant makes the solution work?",
        "back": "dp[i][j] compares prefixes. Equal final characters extend dp[i-1][j-1]; otherwise discard one final character and take max(dp[i-1][j],dp[i][j-1])."
      },
      {
        "type": "Edge case",
        "front": "Longest Common Subsequence: what implementation trap should you check before submitting?",
        "back": "A subsequence need not be contiguous; resetting to zero on a mismatch solves common substring instead."
      },
      {
        "type": "Complexity",
        "front": "Longest Common Subsequence: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(mn). Space: O(mn). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Longest Common Subsequence: trace this case without running code: \"axby\" and \"aby\" ",
        "back": "\"axby\" and \"aby\" => 3 from \"aby\"; \"ab\" and \"cd\" => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.longestCommonSubsequence(\"axby\",\"aby\")!=3)throw new AssertionError();if(s.longestCommonSubsequence(\"ab\",\"cd\")!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/longest-common-subsequence/"
  },
  {
    "id": "lc-72",
    "number": 72,
    "title": "Edit Distance",
    "slug": "edit-distance",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Two strings",
    "context": "Return the minimum number of single-character insertions, deletions, and replacements needed to transform one string into another. Each operation costs one; empty strings are allowed.",
    "examples": "\"cat\" to \"cut\" => 1 replacement; \"\" to \"abc\" => 3 insertions.",
    "solution": "dp[i][j] is the cost between prefixes. Matching characters reuse the diagonal; otherwise add one to the minimum of delete, insert, or replace predecessor. Empty-prefix borders equal prefix length.",
    "timeComplexity": "O(mn)",
    "spaceComplexity": "O(mn)",
    "pitfall": "Initialize both empty-prefix borders; zero-filled borders would allow free insertions or deletions.",
    "followUp": "How would weighted edit costs or adjacent transpositions change the transitions?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minDistance(String a, String b) {\n        int m = a.length(),\n            n = b.length();\n        int[][] d = new int[m + 1][n + 1];\n        for (int i = 0; i <= m; i++) d[i][0] = i;\n        for (int j = 0; j <= n; j++) d[0][j] = j;\n        for (int i = 1; i <= m; i++) for (int j = 1; j <= n; j++) d[i][j] =\n            a.charAt(i - 1) == b.charAt(j - 1)\n                ? d[i - 1][j - 1]\n                : 1 +\n                  Math.min(d[i - 1][j - 1], Math.min(d[i - 1][j], d[i][j - 1]));\n        return d[m][n];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Edit Distance: what state or invariant makes the solution work?",
        "back": "dp[i][j] is the cost between prefixes. Matching characters reuse the diagonal; otherwise add one to the minimum of delete, insert, or replace predecessor. Empty-prefix borders equal prefix length."
      },
      {
        "type": "Edge case",
        "front": "Edit Distance: what implementation trap should you check before submitting?",
        "back": "Initialize both empty-prefix borders; zero-filled borders would allow free insertions or deletions."
      },
      {
        "type": "Complexity",
        "front": "Edit Distance: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(mn). Space: O(mn). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Edit Distance: trace this case without running code: \"cat\" to \"cut\" ",
        "back": "\"cat\" to \"cut\" => 1 replacement; \"\" to \"abc\" => 3 insertions."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minDistance(\"cat\",\"cut\")!=1)throw new AssertionError();if(s.minDistance(\"\",\"abc\")!=3)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/edit-distance/"
  },
  {
    "id": "lc-139",
    "number": 139,
    "title": "Word Break",
    "slug": "word-break",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Prefix feasibility",
    "context": "Given a string and a dictionary of nonempty words, return whether the string can be segmented into dictionary words. Words may be reused.",
    "examples": "\"redblue\" with [red,blue] => true; \"redblu\" => false.",
    "solution": "dp[i] means the first i characters can be segmented. For each endpoint, test a dictionary suffix after a feasible prefix. dp[0]=true seeds the first word.",
    "timeComplexity": "O(n² * L) upper bound with substring hashing, L=max word length",
    "spaceComplexity": "O(n + dictionary characters)",
    "pitfall": "Do not greedily pick the first or longest matching word; a different split may be required.",
    "followUp": "How would a trie avoid repeatedly constructing candidate substrings?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean wordBreak(String s, List<String> words) {\n        Set<String> set = new HashSet<>(words);\n        int max = 0;\n        for (String w : words) max = Math.max(max, w.length());\n        boolean[] dp = new boolean[s.length() + 1];\n        dp[0] = true;\n        for (int i = 1; i <= s.length(); i++) for (\n            int j = Math.max(0, i - max);\n            j < i;\n            j++\n        ) if (dp[j] && set.contains(s.substring(j, i))) {\n            dp[i] = true;\n            break;\n        }\n        return dp[s.length()];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Word Break: what state or invariant makes the solution work?",
        "back": "dp[i] means the first i characters can be segmented. For each endpoint, test a dictionary suffix after a feasible prefix. dp[0]=true seeds the first word."
      },
      {
        "type": "Edge case",
        "front": "Word Break: what implementation trap should you check before submitting?",
        "back": "Do not greedily pick the first or longest matching word; a different split may be required."
      },
      {
        "type": "Complexity",
        "front": "Word Break: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n² * L) upper bound with substring hashing, L=max word length. Space: O(n + dictionary characters). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Word Break: trace this case without running code: \"redblue\" with [red,blue] ",
        "back": "\"redblue\" with [red,blue] => true; \"redblu\" => false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.wordBreak(\"redblue\",List.of(\"red\",\"blue\")))throw new AssertionError();if(s.wordBreak(\"redblu\",List.of(\"red\",\"blue\")))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/word-break/"
  },
  {
    "id": "lc-416",
    "number": 416,
    "title": "Partition Equal Subset Sum",
    "slug": "partition-equal-subset-sum",
    "difficulty": "Medium",
    "tags": "Dynamic programming, 0/1 knapsack",
    "context": "Given positive integers, return whether they can be divided into two subsets with equal sums. Every input element belongs to exactly one subset.",
    "examples": "[2,3,5] => true via [2,3] and [5]; [1,2,4] => false.",
    "solution": "An odd total is impossible. Otherwise ask whether a subset reaches total/2. For each item, update reachable sums downward so that item contributes at most once.",
    "timeComplexity": "O(n * total)",
    "spaceComplexity": "O(total)",
    "pitfall": "Ascending sums would reuse the same item several times, changing 0/1 knapsack into unbounded knapsack.",
    "followUp": "How would negative numbers change the state range and update strategy?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean canPartition(int[] a) {\n        int sum = 0;\n        for (int x : a) sum += x;\n        if ((sum & 1) != 0) return false;\n        int target = sum / 2;\n        boolean[] dp = new boolean[target + 1];\n        dp[0] = true;\n        for (int x : a) for (int j = target; j >= x; j--) dp[j] |= dp[j - x];\n        return dp[target];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Partition Equal Subset Sum: what state or invariant makes the solution work?",
        "back": "An odd total is impossible. Otherwise ask whether a subset reaches total/2. For each item, update reachable sums downward so that item contributes at most once."
      },
      {
        "type": "Edge case",
        "front": "Partition Equal Subset Sum: what implementation trap should you check before submitting?",
        "back": "Ascending sums would reuse the same item several times, changing 0/1 knapsack into unbounded knapsack."
      },
      {
        "type": "Complexity",
        "front": "Partition Equal Subset Sum: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * total). Space: O(total). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Partition Equal Subset Sum: trace this case without running code: [2,3,5] ",
        "back": "[2,3,5] => true via [2,3] and [5]; [1,2,4] => false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.canPartition(new int[]{2,3,5}))throw new AssertionError();if(s.canPartition(new int[]{1,2,4})||s.canPartition(new int[]{1,2,5}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/partition-equal-subset-sum/"
  },
  {
    "id": "lc-494",
    "number": 494,
    "title": "Target Sum",
    "slug": "target-sum",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Subset counting",
    "context": "Assign either plus or minus to every nonnegative integer, including zeros. Count assignments whose signed sum equals target. Equal values at different positions are distinct choices.",
    "examples": "[0,1], target=1 => 2 because either sign on zero works; [1,2], target=0 => 0.",
    "solution": "If positive-signed elements sum to P and all numbers sum to S, then 2P=S+target. Reject impossible range/parity and count 0/1 subsets summing to P. Descending updates use each position once; zeros correctly double counts.",
    "timeComplexity": "O(n * (S + target)) within feasible range",
    "spaceComplexity": "O(S + target)",
    "pitfall": "Zero contributes two sign choices; do not remove zeros or skip the j=0 update.",
    "followUp": "Compare this transformed knapsack with a map from signed sum to count.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findTargetSumWays(int[] a, int target) {\n        int sum = 0;\n        for (int x : a) sum += x;\n        if (Math.abs(target) > sum || ((sum + target) & 1) != 0) return 0;\n        int p = (sum + target) / 2;\n        int[] dp = new int[p + 1];\n        dp[0] = 1;\n        for (int x : a) for (int j = p; j >= x; j--) dp[j] += dp[j - x];\n        return dp[p];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Target Sum: what state or invariant makes the solution work?",
        "back": "If positive-signed elements sum to P and all numbers sum to S, then 2P=S+target. Reject impossible range/parity and count 0/1 subsets summing to P. Descending updates use each position once; zeros correctly double counts."
      },
      {
        "type": "Edge case",
        "front": "Target Sum: what implementation trap should you check before submitting?",
        "back": "Zero contributes two sign choices; do not remove zeros or skip the j=0 update."
      },
      {
        "type": "Complexity",
        "front": "Target Sum: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * (S + target)) within feasible range. Space: O(S + target). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Target Sum: trace this case without running code: [0,1], target=1 ",
        "back": "[0,1], target=1 => 2 because either sign on zero works; [1,2], target=0 => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.findTargetSumWays(new int[]{0,1},1)!=2)throw new AssertionError();if(s.findTargetSumWays(new int[]{1,2},0)!=0||s.findTargetSumWays(new int[]{1},-1)!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/target-sum/"
  },
  {
    "id": "lc-62",
    "number": 62,
    "title": "Unique Paths",
    "slug": "unique-paths",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Grid paths",
    "context": "Count paths from the top-left to bottom-right of an m by n grid, moving only down or right. Dimensions are positive; the answer fits a signed 32-bit integer.",
    "examples": "m=2,n=3 => 3 paths: RRD,RDR,DRR.",
    "solution": "Paths into a cell arrive from above or left. One row of counts starts at ones; updating left-to-right adds the new left count to the old above count.",
    "timeComplexity": "O(mn)",
    "spaceComplexity": "O(n)",
    "pitfall": "Every cell in the first row or column has one path, not zero.",
    "followUp": "Derive a binomial-coefficient formula and discuss overflow-safe evaluation.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int uniquePaths(int m, int n) {\n        int[] dp = new int[n];\n        Arrays.fill(dp, 1);\n        for (int r = 1; r < m; r++) for (int c = 1; c < n; c++) dp[c] += dp[\n            c - 1\n        ];\n        return dp[n - 1];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Unique Paths: what state or invariant makes the solution work?",
        "back": "Paths into a cell arrive from above or left. One row of counts starts at ones; updating left-to-right adds the new left count to the old above count."
      },
      {
        "type": "Edge case",
        "front": "Unique Paths: what implementation trap should you check before submitting?",
        "back": "Every cell in the first row or column has one path, not zero."
      },
      {
        "type": "Complexity",
        "front": "Unique Paths: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(mn). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Unique Paths: trace this case without running code: m=2,n=3 ",
        "back": "m=2,n=3 => 3 paths: RRD,RDR,DRR."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.uniquePaths(2,3)!=3)throw new AssertionError();if(s.uniquePaths(1,7)!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/unique-paths/"
  },
  {
    "id": "lc-63",
    "number": 63,
    "title": "Unique Paths II",
    "slug": "unique-paths-ii",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Grid paths",
    "context": "Count top-left to bottom-right paths moving right/down in a rectangular grid where 1 blocks a cell and 0 allows passage. A blocked start or end yields zero.",
    "examples": "[[0,1],[0,0]] => 1; [[1]] => 0.",
    "solution": "Keep one row of path counts. A blocked cell resets its count to zero; otherwise add the left count to the old count from above. Seed only the start with one.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(cols)",
    "pitfall": "Reset blocked cells even if their dp slot contains a count from a previous row.",
    "followUp": "How would you count paths that may remove exactly one obstacle?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int uniquePathsWithObstacles(int[][] g) {\n        int n = g[0].length;\n        int[] dp = new int[n];\n        dp[0] = 1;\n        for (int[] row : g)\n            for (int c = 0; c < n; c++) {\n                if (row[c] == 1) dp[c] = 0;\n                else if (c > 0) dp[c] += dp[c - 1];\n            }\n        return dp[n - 1];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Unique Paths II: what state or invariant makes the solution work?",
        "back": "Keep one row of path counts. A blocked cell resets its count to zero; otherwise add the left count to the old count from above. Seed only the start with one."
      },
      {
        "type": "Edge case",
        "front": "Unique Paths II: what implementation trap should you check before submitting?",
        "back": "Reset blocked cells even if their dp slot contains a count from a previous row."
      },
      {
        "type": "Complexity",
        "front": "Unique Paths II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Unique Paths II: trace this case without running code: [[0,1],[0,0]] ",
        "back": "[[0,1],[0,0]] => 1; [[1]] => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.uniquePathsWithObstacles(new int[][]{{0,1},{0,0}})!=1)throw new AssertionError();if(s.uniquePathsWithObstacles(new int[][]{{1}})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/unique-paths-ii/"
  },
  {
    "id": "lc-64",
    "number": 64,
    "title": "Minimum Path Sum",
    "slug": "minimum-path-sum",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Grid paths",
    "context": "Return the minimum sum along a top-left to bottom-right path through a nonnegative rectangular grid, moving only right or down. Include both endpoint values.",
    "examples": "[[1,4],[2,3]] => 6 using 1,2,3.",
    "solution": "Each cell’s best sum is its value plus the minimum reachable predecessor from above or left. Rolling storage retains above values until overwritten and left values after update.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(cols)",
    "pitfall": "Do not treat an absent predecessor as zero, which would invent a path entering from outside the board.",
    "followUp": "Store parent directions to return a minimum-cost path.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minPathSum(int[][] g) {\n        int n = g[0].length;\n        int[] dp = new int[n];\n        Arrays.fill(dp, Integer.MAX_VALUE);\n        dp[0] = 0;\n        for (int[] row : g)\n            for (int c = 0; c < n; c++) {\n                int best = c == 0 ? dp[c] : Math.min(dp[c], dp[c - 1]);\n                dp[c] = best + row[c];\n            }\n        return dp[n - 1];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Minimum Path Sum: what state or invariant makes the solution work?",
        "back": "Each cell’s best sum is its value plus the minimum reachable predecessor from above or left. Rolling storage retains above values until overwritten and left values after update."
      },
      {
        "type": "Edge case",
        "front": "Minimum Path Sum: what implementation trap should you check before submitting?",
        "back": "Do not treat an absent predecessor as zero, which would invent a path entering from outside the board."
      },
      {
        "type": "Complexity",
        "front": "Minimum Path Sum: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Minimum Path Sum: trace this case without running code: [[1,4],[2,3]] ",
        "back": "[[1,4],[2,3]] => 6 using 1,2,3."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minPathSum(new int[][]{{1,4},{2,3}})!=6)throw new AssertionError();if(s.minPathSum(new int[][]{{7}})!=7)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/minimum-path-sum/"
  },
  {
    "id": "lc-120",
    "number": 120,
    "title": "Triangle",
    "slug": "triangle",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Bottom-up",
    "context": "A triangle has row r containing r+1 integers. Move from a cell to either directly below index or index+1 in the next row. Return the minimum top-to-bottom sum; values may be negative.",
    "examples": "[[2],[3,4],[6,1,5]] => 6 via 2,3,1.",
    "solution": "Process rows bottom-up. dp[c] becomes value[r][c]+min(dp[c],dp[c+1]), where both predecessor values still describe the row below. The top state is the optimum.",
    "timeComplexity": "O(number of triangle cells)",
    "spaceComplexity": "O(number of rows)",
    "pitfall": "Update columns left-to-right so dp[c+1] still belongs to the row below.",
    "followUp": "Can the triangle itself hold the DP if mutation is permitted?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minimumTotal(List<List<Integer>> t) {\n        int[] dp = new int[t.size() + 1];\n        for (int r = t.size() - 1; r >= 0; r--) for (int c = 0; c <= r; c++) dp[\n            c\n        ] = t.get(r).get(c) + Math.min(dp[c], dp[c + 1]);\n        return dp[0];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Triangle: what state or invariant makes the solution work?",
        "back": "Process rows bottom-up. dp[c] becomes value[r][c]+min(dp[c],dp[c+1]), where both predecessor values still describe the row below. The top state is the optimum."
      },
      {
        "type": "Edge case",
        "front": "Triangle: what implementation trap should you check before submitting?",
        "back": "Update columns left-to-right so dp[c+1] still belongs to the row below."
      },
      {
        "type": "Complexity",
        "front": "Triangle: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(number of triangle cells). Space: O(number of rows). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Triangle: trace this case without running code: [[2],[3,4],[6,1,5]] ",
        "back": "[[2],[3,4],[6,1,5]] => 6 via 2,3,1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minimumTotal(List.of(List.of(2),List.of(3,4),List.of(6,1,5)))!=6)throw new AssertionError();if(s.minimumTotal(List.of(List.of(-3)))!=-3)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/triangle/"
  },
  {
    "id": "lc-221",
    "number": 221,
    "title": "Maximal Square",
    "slug": "maximal-square",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Grid",
    "context": "A rectangular character matrix contains 0 and 1. Return the area of its largest all-ones square, not its side length.",
    "examples": "[[1,1],[1,1]] => area 4; [[1,0],[1,1]] => area 1.",
    "solution": "For a 1 cell, the largest square ending there has side one plus the minimum of upper, left, and upper-left square sides. A zero ends no square. Track the largest side and square it.",
    "timeComplexity": "O(rows * cols)",
    "spaceComplexity": "O(rows * cols)",
    "pitfall": "All three neighboring states constrain the side; using their maximum permits holes inside the square.",
    "followUp": "Reduce the table to one row while preserving the old diagonal.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maximalSquare(char[][] a) {\n        int m = a.length,\n            n = a[0].length,\n            best = 0;\n        int[][] dp = new int[m + 1][n + 1];\n        for (int r = 1; r <= m; r++) for (int c = 1; c <= n; c++) if (\n            a[r - 1][c - 1] == '1'\n        ) {\n            dp[r][c] =\n                1 +\n                Math.min(\n                    dp[r - 1][c - 1],\n                    Math.min(dp[r - 1][c], dp[r][c - 1])\n                );\n            best = Math.max(best, dp[r][c]);\n        }\n        return best * best;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximal Square: what state or invariant makes the solution work?",
        "back": "For a 1 cell, the largest square ending there has side one plus the minimum of upper, left, and upper-left square sides. A zero ends no square. Track the largest side and square it."
      },
      {
        "type": "Edge case",
        "front": "Maximal Square: what implementation trap should you check before submitting?",
        "back": "All three neighboring states constrain the side; using their maximum permits holes inside the square."
      },
      {
        "type": "Complexity",
        "front": "Maximal Square: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(rows * cols). Space: O(rows * cols). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Maximal Square: trace this case without running code: [[1,1],[1,1]] ",
        "back": "[[1,1],[1,1]] => area 4; [[1,0],[1,1]] => area 1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maximalSquare(new char[][]{{'1','1'},{'1','1'}})!=4)throw new AssertionError();if(s.maximalSquare(new char[][]{{'1','0'},{'1','1'}})!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/maximal-square/"
  },
  {
    "id": "lc-152",
    "number": 152,
    "title": "Maximum Product Subarray",
    "slug": "maximum-product-subarray",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Extremal states",
    "context": "Return the largest product of a nonempty contiguous subarray of integers. Negative values and zero are allowed; relevant products fit the problem’s 32-bit bounds.",
    "examples": "[-2,3,-4] => 24; [-2,0,-1] => 0.",
    "solution": "Track both maximum and minimum products ending here. Multiplying by a negative swaps their roles. The next extrema are chosen from x, x*oldMax, and x*oldMin; a zero naturally restarts the states.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Tracking only the maximum loses a large positive product formed by two negatives.",
    "followUp": "Why is this state pair sufficient while enumerating every starting index is unnecessary?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProduct(int[] a) {\n        int hi = a[0],\n            lo = a[0],\n            ans = a[0];\n        for (int i = 1; i < a.length; i++) {\n            int x = a[i],\n                p = hi * x,\n                q = lo * x;\n            hi = Math.max(x, Math.max(p, q));\n            lo = Math.min(x, Math.min(p, q));\n            ans = Math.max(ans, hi);\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Maximum Product Subarray: what state or invariant makes the solution work?",
        "back": "Track both maximum and minimum products ending here. Multiplying by a negative swaps their roles. The next extrema are chosen from x, x*oldMax, and x*oldMin; a zero naturally restarts the states."
      },
      {
        "type": "Edge case",
        "front": "Maximum Product Subarray: what implementation trap should you check before submitting?",
        "back": "Tracking only the maximum loses a large positive product formed by two negatives."
      },
      {
        "type": "Complexity",
        "front": "Maximum Product Subarray: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Maximum Product Subarray: trace this case without running code: [-2,3,-4] ",
        "back": "[-2,3,-4] => 24; [-2,0,-1] => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxProduct(new int[]{-2,3,-4})!=24)throw new AssertionError();if(s.maxProduct(new int[]{-2,0,-1})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/maximum-product-subarray/"
  },
  {
    "id": "lc-91",
    "number": 91,
    "title": "Decode Ways",
    "slug": "decode-ways",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Prefix counting",
    "context": "A digit string encodes letters using numbers 1..26. Count ways to split it into valid codes. Zero alone and codes with leading zero are invalid; the answer fits an integer.",
    "examples": "\"121\" => 3: 1|2|1,12|1,1|21; \"01\" => 0.",
    "solution": "dp[i] counts decodings of the first i digits. Add dp[i-1] for a nonzero single digit and dp[i-2] for a two-digit value 10..26. These choices differ in final code length.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Allow 10 and 20 as pairs but never decode 0 or 06 by themselves.",
    "followUp": "Extend the state transitions when a wildcard can represent digits 1..9.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numDecodings(String s) {\n        int n = s.length();\n        int[] dp = new int[n + 1];\n        dp[0] = 1;\n        for (int i = 1; i <= n; i++) {\n            if (s.charAt(i - 1) != '0') dp[i] += dp[i - 1];\n            if (i >= 2) {\n                int x = (s.charAt(i - 2) - '0') * 10 + s.charAt(i - 1) - '0';\n                if (x >= 10 && x <= 26) dp[i] += dp[i - 2];\n            }\n        }\n        return dp[n];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Decode Ways: what state or invariant makes the solution work?",
        "back": "dp[i] counts decodings of the first i digits. Add dp[i-1] for a nonzero single digit and dp[i-2] for a two-digit value 10..26. These choices differ in final code length."
      },
      {
        "type": "Edge case",
        "front": "Decode Ways: what implementation trap should you check before submitting?",
        "back": "Allow 10 and 20 as pairs but never decode 0 or 06 by themselves."
      },
      {
        "type": "Complexity",
        "front": "Decode Ways: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Decode Ways: trace this case without running code: \"121\" ",
        "back": "\"121\" => 3: 1|2|1,12|1,1|21; \"01\" => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.numDecodings(\"121\")!=3)throw new AssertionError();if(s.numDecodings(\"01\")!=0||s.numDecodings(\"10\")!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/decode-ways/"
  },
  {
    "id": "lc-5",
    "number": 5,
    "title": "Longest Palindromic Substring",
    "slug": "longest-palindromic-substring",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Palindrome intervals",
    "context": "Given a nonempty string, return any longest contiguous substring that reads the same in both directions. If several tie, any is acceptable.",
    "examples": "\"cabbad\" => \"abba\"; \"a\" => \"a\".",
    "solution": "An interval is palindromic when its endpoints match and its interior is palindromic, with length one or two as base cases. Fill start indices backward so inner intervals are ready, tracking the longest.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(n²)",
    "pitfall": "This asks for a substring, so skipping characters is not allowed.",
    "followUp": "Compare center expansion using constant auxiliary space with Manacher’s linear-time algorithm.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public String longestPalindrome(String s) {\n        int n = s.length(),\n            start = 0,\n            len = 1;\n        boolean[][] p = new boolean[n][n];\n        for (int i = n - 1; i >= 0; i--) for (int j = i; j < n; j++) if (\n            s.charAt(i) == s.charAt(j) && (j - i < 2 || p[i + 1][j - 1])\n        ) {\n            p[i][j] = true;\n            if (j - i + 1 > len) {\n                start = i;\n                len = j - i + 1;\n            }\n        }\n        return s.substring(start, start + len);\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Longest Palindromic Substring: what state or invariant makes the solution work?",
        "back": "An interval is palindromic when its endpoints match and its interior is palindromic, with length one or two as base cases. Fill start indices backward so inner intervals are ready, tracking the longest."
      },
      {
        "type": "Edge case",
        "front": "Longest Palindromic Substring: what implementation trap should you check before submitting?",
        "back": "This asks for a substring, so skipping characters is not allowed."
      },
      {
        "type": "Complexity",
        "front": "Longest Palindromic Substring: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(n²). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Longest Palindromic Substring: trace this case without running code: \"cabbad\" ",
        "back": "\"cabbad\" => \"abba\"; \"a\" => \"a\"."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.longestPalindrome(\"cabbad\").equals(\"abba\"))throw new AssertionError();if(!s.longestPalindrome(\"a\").equals(\"a\"))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/longest-palindromic-substring/"
  },
  {
    "id": "lc-647",
    "number": 647,
    "title": "Palindromic Substrings",
    "slug": "palindromic-substrings",
    "difficulty": "Medium",
    "tags": "Palindrome, Center expansion",
    "context": "Count palindromic contiguous substrings of a string. Different start/end positions count separately even when their text is equal.",
    "examples": "\"aaa\" => 6: three length-one, two length-two, one length-three.",
    "solution": "Each palindrome has one center: either a character or a gap. Expand around all 2n-1 centers and count every successful equal-endpoint expansion exactly once.",
    "timeComplexity": "O(n²)",
    "spaceComplexity": "O(1)",
    "pitfall": "Include even-length centers between characters; checking only characters misses strings such as aa.",
    "followUp": "Can you derive the count from palindromic radii computed by Manacher’s algorithm?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int countSubstrings(String s) {\n        int ans = 0,\n            n = s.length();\n        for (int center = 0; center < 2 * n - 1; center++) {\n            int l = center / 2,\n                r = l + (center % 2);\n            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {\n                ans++;\n                l--;\n                r++;\n            }\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Palindromic Substrings: what state or invariant makes the solution work?",
        "back": "Each palindrome has one center: either a character or a gap. Expand around all 2n-1 centers and count every successful equal-endpoint expansion exactly once."
      },
      {
        "type": "Edge case",
        "front": "Palindromic Substrings: what implementation trap should you check before submitting?",
        "back": "Include even-length centers between characters; checking only characters misses strings such as aa."
      },
      {
        "type": "Complexity",
        "front": "Palindromic Substrings: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n²). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Palindromic Substrings: trace this case without running code: \"aaa\" ",
        "back": "\"aaa\" => 6: three length-one, two length-two, one length-three."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.countSubstrings(\"aaa\")!=6)throw new AssertionError();if(s.countSubstrings(\"abc\")!=3)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/palindromic-substrings/"
  },
  {
    "id": "lc-97",
    "number": 97,
    "title": "Interleaving String",
    "slug": "interleaving-string",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Two strings",
    "context": "Return whether a target can be formed by merging two strings while preserving the order of characters within each source. Empty sources are allowed; every character must be used.",
    "examples": "a=\"ab\", b=\"cd\", target=\"acbd\" => true; target=\"adbc\" => false.",
    "solution": "dp[i][j] means prefixes of lengths i and j can form target prefix i+j. The last character comes from a[i-1] or b[j-1], provided the matching predecessor state is reachable.",
    "timeComplexity": "O(mn)",
    "spaceComplexity": "O(mn)",
    "pitfall": "Matching character counts is insufficient: each source’s order must be preserved, and total lengths must match.",
    "followUp": "Compress to one row and identify which value represents the old row.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isInterleave(String a, String b, String c) {\n        int m = a.length(),\n            n = b.length();\n        if (m + n != c.length()) return false;\n        boolean[][] dp = new boolean[m + 1][n + 1];\n        dp[0][0] = true;\n        for (int i = 0; i <= m; i++) for (int j = 0; j <= n; j++) {\n            if (i > 0) dp[i][j] |=\n                dp[i - 1][j] && a.charAt(i - 1) == c.charAt(i + j - 1);\n            if (j > 0) dp[i][j] |=\n                dp[i][j - 1] && b.charAt(j - 1) == c.charAt(i + j - 1);\n        }\n        return dp[m][n];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Interleaving String: what state or invariant makes the solution work?",
        "back": "dp[i][j] means prefixes of lengths i and j can form target prefix i+j. The last character comes from a[i-1] or b[j-1], provided the matching predecessor state is reachable."
      },
      {
        "type": "Edge case",
        "front": "Interleaving String: what implementation trap should you check before submitting?",
        "back": "Matching character counts is insufficient: each source’s order must be preserved, and total lengths must match."
      },
      {
        "type": "Complexity",
        "front": "Interleaving String: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(mn). Space: O(mn). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Interleaving String: trace this case without running code: a=\"ab\", b=\"cd\", target=\"acbd\" ",
        "back": "a=\"ab\", b=\"cd\", target=\"acbd\" => true; target=\"adbc\" => false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.isInterleave(\"ab\",\"cd\",\"acbd\"))throw new AssertionError();if(s.isInterleave(\"ab\",\"cd\",\"adbc\")||!s.isInterleave(\"\",\"\",\"\"))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/interleaving-string/"
  },
  {
    "id": "lc-115",
    "number": 115,
    "title": "Distinct Subsequences",
    "slug": "distinct-subsequences",
    "difficulty": "Hard",
    "tags": "Dynamic programming, Subsequence counting",
    "context": "Count how many index selections from source s form target t in order. Repeated letters at different positions create distinct subsequences. The requested answer fits a signed 32-bit integer.",
    "examples": "s=\"aaa\", t=\"aa\" => 3 index pairs; s=\"ab\", t=\"abc\" => 0.",
    "solution": "dp[j] counts ways to form the first j target letters from the processed source prefix. For each source character, update matching target positions backward so the same source position is never reused.",
    "timeComplexity": "O(|s| * |t|)",
    "spaceComplexity": "O(|t|)",
    "pitfall": "An empty target has one construction. Iterate target indices downward; upward iteration reuses the current source character.",
    "followUp": "How would you answer when counts exceed 64-bit range?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numDistinct(String s, String t) {\n        long[] dp = new long[t.length() + 1];\n        dp[0] = 1;\n        for (int i = 0; i < s.length(); i++) for (\n            int j = t.length();\n            j >= 1;\n            j--\n        ) if (s.charAt(i) == t.charAt(j - 1)) dp[j] = Math.min(\n            Integer.MAX_VALUE,\n            (long) dp[j] + dp[j - 1]\n        );\n        return (int) dp[t.length()];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Distinct Subsequences: what state or invariant makes the solution work?",
        "back": "dp[j] counts ways to form the first j target letters from the processed source prefix. For each source character, update matching target positions backward so the same source position is never reused."
      },
      {
        "type": "Edge case",
        "front": "Distinct Subsequences: what implementation trap should you check before submitting?",
        "back": "An empty target has one construction. Iterate target indices downward; upward iteration reuses the current source character."
      },
      {
        "type": "Complexity",
        "front": "Distinct Subsequences: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(|s| * |t|). Space: O(|t|). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Distinct Subsequences: trace this case without running code: s=\"aaa\", t=\"aa\" ",
        "back": "s=\"aaa\", t=\"aa\" => 3 index pairs; s=\"ab\", t=\"abc\" => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.numDistinct(\"aaa\",\"aa\")!=3)throw new AssertionError();if(s.numDistinct(\"ab\",\"abc\")!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/distinct-subsequences/"
  },
  {
    "id": "lc-312",
    "number": 312,
    "title": "Burst Balloons",
    "slug": "burst-balloons",
    "difficulty": "Hard",
    "tags": "Dynamic programming, Interval DP",
    "context": "Burst every balloon in an integer array. Bursting one earns its value times the values of its currently adjacent balloons, using virtual boundary value 1. Return the maximum total.",
    "examples": "[2,3] => 9: burst 2 for 6, then 3 for 3; [5] => 5.",
    "solution": "Pad with ones and choose the last balloon k burst in each open interval (l,r). Its neighbors are then fixed at l and r, so the two subinterval optima are independent. Maximize left+right+a[l]*a[k]*a[r].",
    "timeComplexity": "O(n³)",
    "spaceComplexity": "O(n²)",
    "pitfall": "Choosing the first balloon leaves changing boundaries; choosing the last fixes them and enables independent subproblems.",
    "followUp": "How would you reconstruct a maximizing burst order from the chosen split points?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxCoins(int[] nums) {\n        int n = nums.length;\n        int[] a = new int[n + 2];\n        a[0] = a[n + 1] = 1;\n        System.arraycopy(nums, 0, a, 1, n);\n        int[][] dp = new int[n + 2][n + 2];\n        for (int len = 2; len < n + 2; len++) for (\n            int l = 0;\n            l + len < n + 2;\n            l++\n        ) {\n            int r = l + len;\n            for (int k = l + 1; k < r; k++) dp[l][r] = Math.max(\n                dp[l][r],\n                dp[l][k] + dp[k][r] + a[l] * a[k] * a[r]\n            );\n        }\n        return dp[0][n + 1];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Burst Balloons: what state or invariant makes the solution work?",
        "back": "Pad with ones and choose the last balloon k burst in each open interval (l,r). Its neighbors are then fixed at l and r, so the two subinterval optima are independent. Maximize left+right+a[l]*a[k]*a[r]."
      },
      {
        "type": "Edge case",
        "front": "Burst Balloons: what implementation trap should you check before submitting?",
        "back": "Choosing the first balloon leaves changing boundaries; choosing the last fixes them and enables independent subproblems."
      },
      {
        "type": "Complexity",
        "front": "Burst Balloons: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n³). Space: O(n²). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Burst Balloons: trace this case without running code: [2,3] ",
        "back": "[2,3] => 9: burst 2 for 6, then 3 for 3; [5] => 5."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxCoins(new int[]{2,3})!=9)throw new AssertionError();if(s.maxCoins(new int[]{5})!=5)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/burst-balloons/"
  },
  {
    "id": "lc-309",
    "number": 309,
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "slug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "difficulty": "Medium",
    "tags": "Dynamic programming, State machine",
    "context": "Given daily prices, maximize profit with any number of transactions while holding at most one share. After selling, the next day is a cooldown when buying is forbidden.",
    "examples": "[1,2,3,0,2] => 3; [5] => 0.",
    "solution": "Maintain hold, sold-today, and rest states. A purchase comes only from yesterday’s rest; today’s rest may come from yesterday’s sale. Compute all transitions from old states to enforce a full cooldown.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Buying from yesterday’s sold state violates the one-day cooldown.",
    "followUp": "How would a cooldown of d days change the required history?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProfit(int[] p) {\n        int hold = -p[0],\n            sold = Integer.MIN_VALUE / 2,\n            rest = 0;\n        for (int i = 1; i < p.length; i++) {\n            int nh = Math.max(hold, rest - p[i]),\n                ns = hold + p[i],\n                nr = Math.max(rest, sold);\n            hold = nh;\n            sold = ns;\n            rest = nr;\n        }\n        return Math.max(rest, sold);\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Best Time to Buy and Sell Stock with Cooldown: what state or invariant makes the solution work?",
        "back": "Maintain hold, sold-today, and rest states. A purchase comes only from yesterday’s rest; today’s rest may come from yesterday’s sale. Compute all transitions from old states to enforce a full cooldown."
      },
      {
        "type": "Edge case",
        "front": "Best Time to Buy and Sell Stock with Cooldown: what implementation trap should you check before submitting?",
        "back": "Buying from yesterday’s sold state violates the one-day cooldown."
      },
      {
        "type": "Complexity",
        "front": "Best Time to Buy and Sell Stock with Cooldown: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Best Time to Buy and Sell Stock with Cooldown: trace this case without running code: [1,2,3,0,2] ",
        "back": "[1,2,3,0,2] => 3; [5] => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxProfit(new int[]{1,2,3,0,2})!=3)throw new AssertionError();if(s.maxProfit(new int[]{5})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/"
  },
  {
    "id": "lc-714",
    "number": 714,
    "title": "Best Time to Buy and Sell Stock with Transaction Fee",
    "slug": "best-time-to-buy-and-sell-stock-with-transaction-fee",
    "difficulty": "Medium",
    "tags": "Dynamic programming, State machine",
    "context": "Maximize profit over daily prices while holding at most one share. Every completed buy/sell transaction incurs a fixed nonnegative fee; any number of transactions is allowed.",
    "examples": "[1,4,2,7], fee=2 => 4; staying invested from 1 to 7 avoids an extra fee.",
    "solution": "Track cash without a share and hold with a share. Sell from old hold and charge the fee once; buy from old cash. Taking maxima preserves the best result for each holding state.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Charge the fee once per complete transaction, not on both buy and sell.",
    "followUp": "Compare charging the fee at purchase versus sale and prove equivalence.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProfit(int[] p, int fee) {\n        int cash = 0,\n            hold = -p[0];\n        for (int i = 1; i < p.length; i++) {\n            int oldCash = cash;\n            cash = Math.max(cash, hold + p[i] - fee);\n            hold = Math.max(hold, oldCash - p[i]);\n        }\n        return cash;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Best Time to Buy and Sell Stock with Transaction Fee: what state or invariant makes the solution work?",
        "back": "Track cash without a share and hold with a share. Sell from old hold and charge the fee once; buy from old cash. Taking maxima preserves the best result for each holding state."
      },
      {
        "type": "Edge case",
        "front": "Best Time to Buy and Sell Stock with Transaction Fee: what implementation trap should you check before submitting?",
        "back": "Charge the fee once per complete transaction, not on both buy and sell."
      },
      {
        "type": "Complexity",
        "front": "Best Time to Buy and Sell Stock with Transaction Fee: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Best Time to Buy and Sell Stock with Transaction Fee: trace this case without running code: [1,4,2,7], fee=2 ",
        "back": "[1,4,2,7], fee=2 => 4; staying invested from 1 to 7 avoids an extra fee."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxProfit(new int[]{1,4,2,7},2)!=4)throw new AssertionError();if(s.maxProfit(new int[]{7,3,1},2)!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/"
  },
  {
    "id": "lc-123",
    "number": 123,
    "title": "Best Time to Buy and Sell Stock III",
    "slug": "best-time-to-buy-and-sell-stock-iii",
    "difficulty": "Hard",
    "tags": "Dynamic programming, Transaction states",
    "context": "Given daily prices, return maximum profit using at most two complete transactions and never holding more than one share.",
    "examples": "[1,4,2,7] => 8 by profits 3 and 5; falling prices => 0.",
    "solution": "Track best balances after first buy, first sell, second buy, and second sell. Each state either persists or performs its corresponding action from the previous state. Reverse update order reads previous-day states.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Second purchase must be funded from the best completed first sale, not from the original zero balance alone.",
    "followUp": "Generalize the four states to at most k transactions.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProfit(int[] p) {\n        int b1 = Integer.MIN_VALUE / 2,\n            s1 = 0,\n            b2 = Integer.MIN_VALUE / 2,\n            s2 = 0;\n        for (int x : p) {\n            s2 = Math.max(s2, b2 + x);\n            b2 = Math.max(b2, s1 - x);\n            s1 = Math.max(s1, b1 + x);\n            b1 = Math.max(b1, -x);\n        }\n        return s2;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Best Time to Buy and Sell Stock III: what state or invariant makes the solution work?",
        "back": "Track best balances after first buy, first sell, second buy, and second sell. Each state either persists or performs its corresponding action from the previous state. Reverse update order reads previous-day states."
      },
      {
        "type": "Edge case",
        "front": "Best Time to Buy and Sell Stock III: what implementation trap should you check before submitting?",
        "back": "Second purchase must be funded from the best completed first sale, not from the original zero balance alone."
      },
      {
        "type": "Complexity",
        "front": "Best Time to Buy and Sell Stock III: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Best Time to Buy and Sell Stock III: trace this case without running code: [1,4,2,7] ",
        "back": "[1,4,2,7] => 8 by profits 3 and 5; falling prices => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxProfit(new int[]{1,4,2,7})!=8)throw new AssertionError();if(s.maxProfit(new int[]{8,4,1})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/"
  },
  {
    "id": "lc-188",
    "number": 188,
    "title": "Best Time to Buy and Sell Stock IV",
    "slug": "best-time-to-buy-and-sell-stock-iv",
    "difficulty": "Hard",
    "tags": "Dynamic programming, Transaction states",
    "context": "Given prices and a nonnegative transaction limit k, maximize profit with at most k buy/sell pairs, holding at most one share at a time.",
    "examples": "[1,4,2,7], k=1 => 6; k=2 => 8.",
    "solution": "For transaction number t, maintain buy[t] and sell[t]. A buy uses sell[t-1]-price; a sale uses buy[t]+price. Update t downward. When k>=n/2 the limit cannot bind, so collect every positive adjacent rise.",
    "timeComplexity": "O(n * min(k,n)), with O(n) unlimited branch",
    "spaceComplexity": "O(k), O(1) in unlimited branch",
    "pitfall": "Handle k=0 and empty prices; initialize buy states to negative infinity rather than zero.",
    "followUp": "Add a cooldown or fee while preserving the transaction-count dimension.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxProfit(int k, int[] p) {\n        int n = p.length;\n        if (k == 0 || n == 0) return 0;\n        if (k >= n / 2) {\n            int ans = 0;\n            for (int i = 1; i < n; i++) ans += Math.max(0, p[i] - p[i - 1]);\n            return ans;\n        }\n        int[] buy = new int[k + 1],\n            sell = new int[k + 1];\n        Arrays.fill(buy, Integer.MIN_VALUE / 2);\n        for (int x : p)\n            for (int t = k; t >= 1; t--) {\n                sell[t] = Math.max(sell[t], buy[t] + x);\n                buy[t] = Math.max(buy[t], sell[t - 1] - x);\n            }\n        return sell[k];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Best Time to Buy and Sell Stock IV: what state or invariant makes the solution work?",
        "back": "For transaction number t, maintain buy[t] and sell[t]. A buy uses sell[t-1]-price; a sale uses buy[t]+price. Update t downward. When k>=n/2 the limit cannot bind, so collect every positive adjacent rise."
      },
      {
        "type": "Edge case",
        "front": "Best Time to Buy and Sell Stock IV: what implementation trap should you check before submitting?",
        "back": "Handle k=0 and empty prices; initialize buy states to negative infinity rather than zero."
      },
      {
        "type": "Complexity",
        "front": "Best Time to Buy and Sell Stock IV: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * min(k,n)), with O(n) unlimited branch. Space: O(k), O(1) in unlimited branch. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Best Time to Buy and Sell Stock IV: trace this case without running code: [1,4,2,7], k=1 ",
        "back": "[1,4,2,7], k=1 => 6; k=2 => 8."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxProfit(1,new int[]{1,4,2,7})!=6)throw new AssertionError();if(s.maxProfit(2,new int[]{1,4,2,7})!=8||s.maxProfit(0,new int[]{1,4})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/"
  },
  {
    "id": "lc-746",
    "number": 746,
    "title": "Min Cost Climbing Stairs",
    "slug": "min-cost-climbing-stairs",
    "difficulty": "Easy",
    "tags": "Dynamic programming, Rolling state",
    "context": "Each staircase step has a nonnegative cost paid when leaving it. Start at step 0 or 1 and move one or two steps. Return the minimum cost to reach just beyond the final step.",
    "examples": "[4,2,7] => 2 by starting at step 1 and jumping to the top.",
    "solution": "dp[i] is the cheapest cost to stand at position i before paying it. For i>=2, choose between dp[i-1]+cost[i-1] and dp[i-2]+cost[i-2]. Both allowed starting positions cost zero initially.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The target is index n, beyond the array; do not force payment for the final physical step.",
    "followUp": "Return the paid step indices along one cheapest route.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int minCostClimbingStairs(int[] cost) {\n        int a = 0,\n            b = 0;\n        for (int i = 2; i <= cost.length; i++) {\n            int c = Math.min(b + cost[i - 1], a + cost[i - 2]);\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Min Cost Climbing Stairs: what state or invariant makes the solution work?",
        "back": "dp[i] is the cheapest cost to stand at position i before paying it. For i>=2, choose between dp[i-1]+cost[i-1] and dp[i-2]+cost[i-2]. Both allowed starting positions cost zero initially."
      },
      {
        "type": "Edge case",
        "front": "Min Cost Climbing Stairs: what implementation trap should you check before submitting?",
        "back": "The target is index n, beyond the array; do not force payment for the final physical step."
      },
      {
        "type": "Complexity",
        "front": "Min Cost Climbing Stairs: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Min Cost Climbing Stairs: trace this case without running code: [4,2,7] ",
        "back": "[4,2,7] => 2 by starting at step 1 and jumping to the top."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.minCostClimbingStairs(new int[]{4,2,7})!=2)throw new AssertionError();if(s.minCostClimbingStairs(new int[]{0,0})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/min-cost-climbing-stairs/"
  },
  {
    "id": "lc-1137",
    "number": 1137,
    "title": "N-th Tribonacci Number",
    "slug": "nth-tribonacci-number",
    "difficulty": "Easy",
    "tags": "Dynamic programming, Rolling state",
    "context": "Return T(n) where T(0)=0, T(1)=1, T(2)=1 and each later term sums the previous three. The allowed n keeps the result in a signed integer.",
    "examples": "n=4 => 4 from 1+1+2; n=0 => 0.",
    "solution": "Carry exactly the previous three terms and shift them after calculating the next. The recurrence needs no earlier history.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Handle n=0 separately from the two initial ones, and compute the next term before shifting.",
    "followUp": "Express the recurrence as a 3x3 matrix for logarithmic-time exponentiation.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int tribonacci(int n) {\n        if (n == 0) return 0;\n        if (n <= 2) return 1;\n        int a = 0,\n            b = 1,\n            c = 1;\n        for (int i = 3; i <= n; i++) {\n            int d = a + b + c;\n            a = b;\n            b = c;\n            c = d;\n        }\n        return c;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "N-th Tribonacci Number: what state or invariant makes the solution work?",
        "back": "Carry exactly the previous three terms and shift them after calculating the next. The recurrence needs no earlier history."
      },
      {
        "type": "Edge case",
        "front": "N-th Tribonacci Number: what implementation trap should you check before submitting?",
        "back": "Handle n=0 separately from the two initial ones, and compute the next term before shifting."
      },
      {
        "type": "Complexity",
        "front": "N-th Tribonacci Number: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "N-th Tribonacci Number: trace this case without running code: n=4 ",
        "back": "n=4 => 4 from 1+1+2; n=0 => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.tribonacci(4)!=4)throw new AssertionError();if(s.tribonacci(0)!=0||s.tribonacci(2)!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/nth-tribonacci-number/"
  },
  {
    "id": "lc-790",
    "number": 790,
    "title": "Domino and Tromino Tiling",
    "slug": "domino-and-tromino-tiling",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Profile states",
    "context": "Count ways to tile a 2 by n board using dominoes and L-shaped trominoes, allowing rotation. Return the count modulo 1,000,000,007.",
    "examples": "n=2 => 2 tilings; n=3 => 5.",
    "solution": "Full-board and one-cell-gap states reduce to f[n]=2*f[n-1]+f[n-3]. Base counts are f[0]=1, f[1]=1, f[2]=2. The gap states account for paired tromino boundaries that a Fibonacci recurrence misses.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(n)",
    "pitfall": "Use long for 2*f[n-1]+f[n-3] before taking the modulus; an int can overflow.",
    "followUp": "Derive the compressed recurrence explicitly from full and gap states.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numTilings(int n) {\n        if (n <= 2) return n;\n        long mod = 1_000_000_007L;\n        long[] dp = new long[n + 1];\n        dp[0] = 1;\n        dp[1] = 1;\n        dp[2] = 2;\n        for (int i = 3; i <= n; i++) dp[i] = (2 * dp[i - 1] + dp[i - 3]) % mod;\n        return (int) dp[n];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Domino and Tromino Tiling: what state or invariant makes the solution work?",
        "back": "Full-board and one-cell-gap states reduce to f[n]=2*f[n-1]+f[n-3]. Base counts are f[0]=1, f[1]=1, f[2]=2. The gap states account for paired tromino boundaries that a Fibonacci recurrence misses."
      },
      {
        "type": "Edge case",
        "front": "Domino and Tromino Tiling: what implementation trap should you check before submitting?",
        "back": "Use long for 2*f[n-1]+f[n-3] before taking the modulus; an int can overflow."
      },
      {
        "type": "Complexity",
        "front": "Domino and Tromino Tiling: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Domino and Tromino Tiling: trace this case without running code: n=2 ",
        "back": "n=2 => 2 tilings; n=3 => 5."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.numTilings(2)!=2)throw new AssertionError();if(s.numTilings(3)!=5||s.numTilings(4)!=11)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/domino-and-tromino-tiling/"
  },
  {
    "id": "lc-1043",
    "number": 1043,
    "title": "Partition Array for Maximum Sum",
    "slug": "partition-array-for-maximum-sum",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Partition boundaries",
    "context": "Split a nonnegative array into contiguous blocks of length at most k. Replace every value in each block with that block’s maximum. Return the largest resulting total.",
    "examples": "[1,5,2], k=2 => 12: split [1,5],[2] and replace the first block with [5,5], yielding 5+5+2.",
    "solution": "dp[i] is the best total for the first i items. Try every final block length up to k, maintaining its maximum while extending backward; candidate score is dp[i-length]+length*blockMax.",
    "timeComplexity": "O(nk)",
    "spaceComplexity": "O(n)",
    "pitfall": "A locally attractive block can hurt later choices; maximize over every valid final boundary.",
    "followUp": "Store the winning block length to reconstruct an optimal partition.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int maxSumAfterPartitioning(int[] a, int k) {\n        int[] dp = new int[a.length + 1];\n        for (int i = 1; i <= a.length; i++) {\n            int max = 0;\n            for (int len = 1; len <= k && len <= i; len++) {\n                max = Math.max(max, a[i - len]);\n                dp[i] = Math.max(dp[i], dp[i - len] + max * len);\n            }\n        }\n        return dp[a.length];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Partition Array for Maximum Sum: what state or invariant makes the solution work?",
        "back": "dp[i] is the best total for the first i items. Try every final block length up to k, maintaining its maximum while extending backward; candidate score is dp[i-length]+length*blockMax."
      },
      {
        "type": "Edge case",
        "front": "Partition Array for Maximum Sum: what implementation trap should you check before submitting?",
        "back": "A locally attractive block can hurt later choices; maximize over every valid final boundary."
      },
      {
        "type": "Complexity",
        "front": "Partition Array for Maximum Sum: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(nk). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Partition Array for Maximum Sum: trace this case without running code: [1,5,2], k=2 ",
        "back": "[1,5,2], k=2 => 12: split [1,5],[2] and replace the first block with [5,5], yielding 5+5+2."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.maxSumAfterPartitioning(new int[]{1,5,2},2)!=12)throw new AssertionError();if(s.maxSumAfterPartitioning(new int[]{1,5,2},1)!=8)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/partition-array-for-maximum-sum/"
  },
  {
    "id": "lc-474",
    "number": 474,
    "title": "Ones and Zeroes",
    "slug": "ones-and-zeroes",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Two-budget knapsack",
    "context": "Given binary strings and budgets m zeros and n ones, return the largest number of strings selectable without exceeding either budget. Each string position can be selected once.",
    "examples": "[\"0\",\"1\",\"01\"], m=1,n=1 => 2 by selecting the first two strings.",
    "solution": "dp[z][o] stores the maximum chosen count within budgets z and o. For each string count its zeros/ones, then update both budgets downward to enforce single use.",
    "timeComplexity": "O(total input characters + number of strings * m * n)",
    "spaceComplexity": "O(mn)",
    "pitfall": "Both budget loops must descend; ascending either dimension can reuse the same string.",
    "followUp": "How would you reconstruct which string indices were selected?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int findMaxForm(String[] strs, int m, int n) {\n        int[][] dp = new int[m + 1][n + 1];\n        for (String s : strs) {\n            int zero = 0;\n            for (char c : s.toCharArray()) if (c == '0') zero++;\n            int one = s.length() - zero;\n            for (int z = m; z >= zero; z--) for (int o = n; o >= one; o--) dp[\n                z\n            ][o] = Math.max(dp[z][o], 1 + dp[z - zero][o - one]);\n        }\n        return dp[m][n];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Ones and Zeroes: what state or invariant makes the solution work?",
        "back": "dp[z][o] stores the maximum chosen count within budgets z and o. For each string count its zeros/ones, then update both budgets downward to enforce single use."
      },
      {
        "type": "Edge case",
        "front": "Ones and Zeroes: what implementation trap should you check before submitting?",
        "back": "Both budget loops must descend; ascending either dimension can reuse the same string."
      },
      {
        "type": "Complexity",
        "front": "Ones and Zeroes: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(total input characters + number of strings * m * n). Space: O(mn). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Ones and Zeroes: trace this case without running code: [\"0\",\"1\",\"01\"], m=1,n=1 ",
        "back": "[\"0\",\"1\",\"01\"], m=1,n=1 => 2 by selecting the first two strings."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.findMaxForm(new String[]{\"0\",\"1\",\"01\"},1,1)!=2)throw new AssertionError();if(s.findMaxForm(new String[]{\"00\"},1,2)!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/ones-and-zeroes/"
  },
  {
    "id": "lc-279",
    "number": 279,
    "title": "Perfect Squares",
    "slug": "perfect-squares",
    "difficulty": "Medium",
    "tags": "Dynamic programming, Unbounded choices",
    "context": "Given positive n, return the fewest positive perfect-square numbers whose sum equals n. Squares can be reused.",
    "examples": "n=13 => 2 via 9+4; n=12 => 3 via 4+4+4.",
    "solution": "Let dp[x] be the minimum count for x. Try each square j*j<=x as the final summand and extend dp[x-j*j]. Start dp[0]=0; all smaller sums are already solved.",
    "timeComplexity": "O(n * sqrt(n))",
    "spaceComplexity": "O(n)",
    "pitfall": "Greedily taking the largest square can fail, such as 12: 9+1+1+1 loses to 4+4+4.",
    "followUp": "Compare DP with BFS over residual sums and number-theoretic bounds.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int numSquares(int n) {\n        int[] dp = new int[n + 1];\n        for (int x = 1; x <= n; x++) {\n            dp[x] = x;\n            for (int j = 1; j * j <= x; j++) dp[x] = Math.min(\n                dp[x],\n                dp[x - j * j] + 1\n            );\n        }\n        return dp[n];\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Perfect Squares: what state or invariant makes the solution work?",
        "back": "Let dp[x] be the minimum count for x. Try each square j*j<=x as the final summand and extend dp[x-j*j]. Start dp[0]=0; all smaller sums are already solved."
      },
      {
        "type": "Edge case",
        "front": "Perfect Squares: what implementation trap should you check before submitting?",
        "back": "Greedily taking the largest square can fail, such as 12: 9+1+1+1 loses to 4+4+4."
      },
      {
        "type": "Complexity",
        "front": "Perfect Squares: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n * sqrt(n)). Space: O(n). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Perfect Squares: trace this case without running code: n=13 ",
        "back": "n=13 => 2 via 9+4; n=12 => 3 via 4+4+4."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.numSquares(13)!=2)throw new AssertionError();if(s.numSquares(12)!=3)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/perfect-squares/"
  },
  {
    "id": "lc-136",
    "number": 136,
    "title": "Single Number",
    "slug": "single-number",
    "difficulty": "Easy",
    "tags": "Bit manipulation, XOR",
    "context": "A nonempty integer array contains one value once and every other value exactly twice. Return the unpaired value using constant extra space.",
    "examples": "[7,2,7] => 2; [-4] => -4.",
    "solution": "XOR all values. Equal pairs cancel because x XOR x=0, and zero is the identity. Associativity and commutativity leave exactly the unpaired bit pattern.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "The cancellation proof depends on the exact multiplicity guarantee; it does not solve arbitrary frequency anomalies.",
    "followUp": "How does the problem change when other values occur three times?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int singleNumber(int[] nums) {\n        int ans = 0;\n        for (int x : nums) ans ^= x;\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Single Number: what state or invariant makes the solution work?",
        "back": "XOR all values. Equal pairs cancel because x XOR x=0, and zero is the identity. Associativity and commutativity leave exactly the unpaired bit pattern."
      },
      {
        "type": "Edge case",
        "front": "Single Number: what implementation trap should you check before submitting?",
        "back": "The cancellation proof depends on the exact multiplicity guarantee; it does not solve arbitrary frequency anomalies."
      },
      {
        "type": "Complexity",
        "front": "Single Number: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Single Number: trace this case without running code: [7,2,7] ",
        "back": "[7,2,7] => 2; [-4] => -4."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.singleNumber(new int[]{7,2,7})!=2)throw new AssertionError();if(s.singleNumber(new int[]{-4})!=-4)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/single-number/"
  },
  {
    "id": "lc-137",
    "number": 137,
    "title": "Single Number II",
    "slug": "single-number-ii",
    "difficulty": "Medium",
    "tags": "Bit manipulation, Modular counting",
    "context": "Every value in a nonempty integer array appears three times except one appearing once. Return the unique value, including negative integers, with constant auxiliary space.",
    "examples": "[5,5,5,-2] => -2; [0,4,4,4] => 0.",
    "solution": "For each of the 32 bit positions, sum that bit across all integers modulo three. Reassemble the positions whose residue is one. Java’s sign bit is reconstructed like every other bit.",
    "timeComplexity": "O(32n), hence O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Inspect all 32 bits, including bit 31; ignoring the sign bit breaks negative answers.",
    "followUp": "Derive the two-register finite-state machine that tracks bit counts modulo three in one pass.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int singleNumber(int[] nums) {\n        int ans = 0;\n        for (int b = 0; b < 32; b++) {\n            int residue = 0;\n            for (int x : nums) residue = (residue + ((x >>> b) & 1)) % 3;\n            if (residue == 1) ans |= 1 << b;\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Single Number II: what state or invariant makes the solution work?",
        "back": "For each of the 32 bit positions, sum that bit across all integers modulo three. Reassemble the positions whose residue is one. Java’s sign bit is reconstructed like every other bit."
      },
      {
        "type": "Edge case",
        "front": "Single Number II: what implementation trap should you check before submitting?",
        "back": "Inspect all 32 bits, including bit 31; ignoring the sign bit breaks negative answers."
      },
      {
        "type": "Complexity",
        "front": "Single Number II: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(32n), hence O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Single Number II: trace this case without running code: [5,5,5,-2] ",
        "back": "[5,5,5,-2] => -2; [0,4,4,4] => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.singleNumber(new int[]{5,5,5,-2})!=-2)throw new AssertionError();if(s.singleNumber(new int[]{0,4,4,4})!=0)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/single-number-ii/"
  },
  {
    "id": "lc-260",
    "number": 260,
    "title": "Single Number III",
    "slug": "single-number-iii",
    "difficulty": "Medium",
    "tags": "Bit manipulation, XOR partition",
    "context": "Exactly two distinct values appear once in an array, and every other value appears twice. Return the two unique values in any order using constant auxiliary space.",
    "examples": "[1,2,1,3] => [2,3] in either order.",
    "solution": "XOR gives a XOR b, which is nonzero. Isolate one set bit and partition all values by it. The unique values land in different groups while each duplicate pair stays together and cancels.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1)",
    "pitfall": "Use a differentiating bit of the combined XOR; partitioning by an arbitrary bit may put both unique values together.",
    "followUp": "Explain why x & -x works even when only the sign bit is set in Java.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] singleNumber(int[] nums) {\n        int x = 0;\n        for (int v : nums) x ^= v;\n        int bit = x & -x,\n            a = 0,\n            b = 0;\n        for (int v : nums)\n            if ((v & bit) == 0) a ^= v;\n            else b ^= v;\n        return new int[] { a, b };\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Single Number III: what state or invariant makes the solution work?",
        "back": "XOR gives a XOR b, which is nonzero. Isolate one set bit and partition all values by it. The unique values land in different groups while each duplicate pair stays together and cancels."
      },
      {
        "type": "Edge case",
        "front": "Single Number III: what implementation trap should you check before submitting?",
        "back": "Use a differentiating bit of the combined XOR; partitioning by an arbitrary bit may put both unique values together."
      },
      {
        "type": "Complexity",
        "front": "Single Number III: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Single Number III: trace this case without running code: [1,2,1,3] ",
        "back": "[1,2,1,3] => [2,3] in either order."
      }
    ],
    "testCode": "Solution s = new Solution();\nint[] a=s.singleNumber(new int[]{1,2,1,3});Arrays.sort(a);if(!Arrays.equals(a,new int[]{2,3}))throw new AssertionError();int[] b=s.singleNumber(new int[]{0,Integer.MIN_VALUE});Arrays.sort(b);if(!Arrays.equals(b,new int[]{Integer.MIN_VALUE,0}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/single-number-iii/"
  },
  {
    "id": "lc-191",
    "number": 191,
    "title": "Number of 1 Bits",
    "slug": "number-of-1-bits",
    "difficulty": "Easy",
    "tags": "Bit manipulation, Brian Kernighan",
    "context": "Given a positive signed 32-bit integer, return its number of set bits. The supplied routine additionally supports any Java int bit pattern, including a set sign bit.",
    "examples": "n=10 (binary 1010) => 2; n=1 => 1.",
    "solution": "Repeatedly apply n &= n-1, which clears the lowest set bit. Each iteration removes exactly one bit, so the iteration count is the population count.",
    "timeComplexity": "O(number of set bits), at most 32",
    "spaceComplexity": "O(1)",
    "pitfall": "Use n!=0 rather than n>0 if the API can supply an unsigned bit pattern represented as a negative Java int.",
    "followUp": "Compare this with a byte lookup table or a hardware population-count instruction.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int hammingWeight(int n) {\n        int count = 0;\n        while (n != 0) {\n            n &= n - 1;\n            count++;\n        }\n        return count;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Number of 1 Bits: what state or invariant makes the solution work?",
        "back": "Repeatedly apply n &= n-1, which clears the lowest set bit. Each iteration removes exactly one bit, so the iteration count is the population count."
      },
      {
        "type": "Edge case",
        "front": "Number of 1 Bits: what implementation trap should you check before submitting?",
        "back": "Use n!=0 rather than n>0 if the API can supply an unsigned bit pattern represented as a negative Java int."
      },
      {
        "type": "Complexity",
        "front": "Number of 1 Bits: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(number of set bits), at most 32. Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Number of 1 Bits: trace this case without running code: n=10 (binary 1010) ",
        "back": "n=10 (binary 1010) => 2; n=1 => 1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.hammingWeight(10)!=2)throw new AssertionError();if(s.hammingWeight(1)!=1||s.hammingWeight(-1)!=32)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/number-of-1-bits/"
  },
  {
    "id": "lc-190",
    "number": 190,
    "title": "Reverse Bits",
    "slug": "reverse-bits",
    "difficulty": "Easy",
    "tags": "Bit manipulation, Fixed-width representation",
    "context": "Reverse all 32 bits of an integer. The current public problem restricts inputs to nonnegative even integers; the supplied routine also handles any 32-bit pattern, using Java int for the result.",
    "examples": "input 2 => 1073741824: bit position 1 moves to position 30; input 0 => 0.",
    "solution": "Repeat exactly 32 times: shift the result left, append the source low bit, and unsigned-shift the source right. After i steps the result contains the reverse of the first i consumed bits.",
    "timeComplexity": "O(32), hence O(1)",
    "spaceComplexity": "O(1)",
    "pitfall": "Do not stop when n becomes zero; remaining leading zeros must become trailing zeros in the fixed-width reversal.",
    "followUp": "How could a precomputed reversed-byte table accelerate repeated calls?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int reverseBits(int n) {\n        int ans = 0;\n        for (int i = 0; i < 32; i++) {\n            ans = (ans << 1) | (n & 1);\n            n >>>= 1;\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Reverse Bits: what state or invariant makes the solution work?",
        "back": "Repeat exactly 32 times: shift the result left, append the source low bit, and unsigned-shift the source right. After i steps the result contains the reverse of the first i consumed bits."
      },
      {
        "type": "Edge case",
        "front": "Reverse Bits: what implementation trap should you check before submitting?",
        "back": "Do not stop when n becomes zero; remaining leading zeros must become trailing zeros in the fixed-width reversal."
      },
      {
        "type": "Complexity",
        "front": "Reverse Bits: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(32), hence O(1). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Reverse Bits: trace this case without running code: input 2 ",
        "back": "input 2 => 1073741824: bit position 1 moves to position 30; input 0 => 0."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.reverseBits(2)!=1073741824)throw new AssertionError();if(s.reverseBits(0)!=0||s.reverseBits(1)!=Integer.MIN_VALUE||s.reverseBits(Integer.MIN_VALUE)!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/reverse-bits/"
  },
  {
    "id": "lc-338",
    "number": 338,
    "title": "Counting Bits",
    "slug": "counting-bits",
    "difficulty": "Easy",
    "tags": "Bit manipulation, Dynamic programming",
    "context": "For every integer from zero through n inclusive, return its number of one bits as an array of length n+1.",
    "examples": "n=4 => [0,1,1,2,1].",
    "solution": "Removing the lowest set bit leaves a smaller already-solved integer. Thus bits[i]=bits[i&(i-1)]+1, with bits[0]=0.",
    "timeComplexity": "O(n)",
    "spaceComplexity": "O(1) auxiliary beyond O(n) output",
    "pitfall": "Include index zero and allocate n+1 entries; n itself is part of the required range.",
    "followUp": "Show the alternative recurrence bits[i]=bits[i>>>1]+(i&1).",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int[] countBits(int n) {\n        int[] bits = new int[n + 1];\n        for (int i = 1; i <= n; i++) bits[i] = bits[i & (i - 1)] + 1;\n        return bits;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Counting Bits: what state or invariant makes the solution work?",
        "back": "Removing the lowest set bit leaves a smaller already-solved integer. Thus bits[i]=bits[i&(i-1)]+1, with bits[0]=0."
      },
      {
        "type": "Edge case",
        "front": "Counting Bits: what implementation trap should you check before submitting?",
        "back": "Include index zero and allocate n+1 entries; n itself is part of the required range."
      },
      {
        "type": "Complexity",
        "front": "Counting Bits: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(n). Space: O(1) auxiliary beyond O(n) output. Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Counting Bits: trace this case without running code: n=4 ",
        "back": "n=4 => [0,1,1,2,1]."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!Arrays.equals(s.countBits(4),new int[]{0,1,1,2,1}))throw new AssertionError();if(!Arrays.equals(s.countBits(0),new int[]{0}))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/counting-bits/"
  },
  {
    "id": "lc-201",
    "number": 201,
    "title": "Bitwise AND of Numbers Range",
    "slug": "bitwise-and-of-numbers-range",
    "difficulty": "Medium",
    "tags": "Bit manipulation, Common prefix",
    "context": "Given nonnegative integers left<=right within signed 32-bit range, return the bitwise AND of every integer in the inclusive interval.",
    "examples": "left=12,right=15 => 12: 1100,1101,1110,1111 retain prefix 11.",
    "solution": "Right-shift both endpoints until they are equal, counting shifts. All differing suffix positions encounter a zero somewhere in the interval; shift the common prefix back to obtain the AND.",
    "timeComplexity": "O(31)",
    "spaceComplexity": "O(1)",
    "pitfall": "Do not iterate through every integer in a potentially billion-element range.",
    "followUp": "Prove that every bit below the highest differing endpoint bit becomes zero.",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public int rangeBitwiseAnd(int left, int right) {\n        int shift = 0;\n        while (left != right) {\n            left >>>= 1;\n            right >>>= 1;\n            shift++;\n        }\n        return left << shift;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Bitwise AND of Numbers Range: what state or invariant makes the solution work?",
        "back": "Right-shift both endpoints until they are equal, counting shifts. All differing suffix positions encounter a zero somewhere in the interval; shift the common prefix back to obtain the AND."
      },
      {
        "type": "Edge case",
        "front": "Bitwise AND of Numbers Range: what implementation trap should you check before submitting?",
        "back": "Do not iterate through every integer in a potentially billion-element range."
      },
      {
        "type": "Complexity",
        "front": "Bitwise AND of Numbers Range: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(31). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Bitwise AND of Numbers Range: trace this case without running code: left=12,right=15 ",
        "back": "left=12,right=15 => 12: 1100,1101,1110,1111 retain prefix 11."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(s.rangeBitwiseAnd(12,15)!=12)throw new AssertionError();if(s.rangeBitwiseAnd(0,Integer.MAX_VALUE)!=0||s.rangeBitwiseAnd(7,7)!=7)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/bitwise-and-of-numbers-range/"
  },
  {
    "id": "lc-50",
    "number": 50,
    "title": "Pow(x, n)",
    "slug": "powx-n",
    "difficulty": "Medium",
    "tags": "Math, Binary exponentiation",
    "context": "Compute a double base raised to an integer exponent, including negative exponents. Inputs avoid undefined zero-to-negative powers. The exponent may be Integer.MIN_VALUE.",
    "examples": "x=2,n=-3 => 0.125; x=3,n=0 => 1.",
    "solution": "Promote the exponent to long before negating. For a negative exponent invert the base. Scan exponent bits: multiply the result on a set bit, square the base, then halve the exponent.",
    "timeComplexity": "O(log(|n| + 1))",
    "spaceComplexity": "O(1)",
    "pitfall": "Negating Integer.MIN_VALUE as an int overflows; convert to long first.",
    "followUp": "How would modular exponentiation differ, especially for negative exponents?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public double myPow(double x, int n) {\n        long exp = n;\n        if (exp < 0) {\n            x = 1 / x;\n            exp = -exp;\n        }\n        double ans = 1;\n        while (exp > 0) {\n            if ((exp & 1) == 1) ans *= x;\n            x *= x;\n            exp >>= 1;\n        }\n        return ans;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Pow(x, n): what state or invariant makes the solution work?",
        "back": "Promote the exponent to long before negating. For a negative exponent invert the base. Scan exponent bits: multiply the result on a set bit, square the base, then halve the exponent."
      },
      {
        "type": "Edge case",
        "front": "Pow(x, n): what implementation trap should you check before submitting?",
        "back": "Negating Integer.MIN_VALUE as an int overflows; convert to long first."
      },
      {
        "type": "Complexity",
        "front": "Pow(x, n): give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(log(|n| + 1)). Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Pow(x, n): trace this case without running code: x=2,n=-3 ",
        "back": "x=2,n=-3 => 0.125; x=3,n=0 => 1."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(Math.abs(s.myPow(2,-3)-0.125)>1e-12)throw new AssertionError();if(s.myPow(3,0)!=1||s.myPow(1,Integer.MIN_VALUE)!=1)throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/powx-n/"
  },
  {
    "id": "lc-202",
    "number": 202,
    "title": "Happy Number",
    "slug": "happy-number",
    "difficulty": "Easy",
    "tags": "Math, Cycle detection",
    "context": "Starting from a positive integer, repeatedly replace it by the sum of squares of its decimal digits. Return whether the process reaches one rather than cycling forever.",
    "examples": "n=7 => 49 -> 97 -> 130 -> 10 -> 1, so true; n=2 cycles, so false.",
    "solution": "The digit-square transform maps into a bounded set, so every sequence reaches one or a cycle. Floyd’s slow/fast pointers detect the cycle in constant space; a meeting at one means happiness.",
    "timeComplexity": "O(log n + C), C=bounded digit-square state traversal for fixed-width integers",
    "spaceComplexity": "O(1)",
    "pitfall": "A non-one value can repeat forever; the loop needs cycle detection rather than only a check for one.",
    "followUp": "Why does summing digit squares eventually enter a small bounded state space?",
    "code": "import java.util.*;\n\nclass Solution {\n\n    public boolean isHappy(int n) {\n        int slow = n,\n            fast = n;\n        do {\n            slow = next(slow);\n            fast = next(next(fast));\n        } while (slow != fast);\n        return slow == 1;\n    }\n\n    private int next(int n) {\n        int sum = 0;\n        while (n > 0) {\n            int d = n % 10;\n            sum += d * d;\n            n /= 10;\n        }\n        return sum;\n    }\n}\n",
    "cards": [
      {
        "type": "Key insight",
        "front": "Happy Number: what state or invariant makes the solution work?",
        "back": "The digit-square transform maps into a bounded set, so every sequence reaches one or a cycle. Floyd’s slow/fast pointers detect the cycle in constant space; a meeting at one means happiness."
      },
      {
        "type": "Edge case",
        "front": "Happy Number: what implementation trap should you check before submitting?",
        "back": "A non-one value can repeat forever; the loop needs cycle detection rather than only a check for one."
      },
      {
        "type": "Complexity",
        "front": "Happy Number: give the time and auxiliary-space bounds, and explain the dominant work.",
        "back": "Time: O(log n + C), C=bounded digit-square state traversal for fixed-width integers. Space: O(1). Count the states/transitions in the supplied solution; include recursion and output where stated."
      },
      {
        "type": "Algorithm steps",
        "front": "Happy Number: trace this case without running code: n=7 ",
        "back": "n=7 => 49 -> 97 -> 130 -> 10 -> 1, so true; n=2 cycles, so false."
      }
    ],
    "testCode": "Solution s = new Solution();\nif(!s.isHappy(7))throw new AssertionError();if(s.isHappy(2))throw new AssertionError();",
    "sourceUrl": "https://leetcode.com/problems/happy-number/"
  }
];
