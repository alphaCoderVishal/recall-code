import { newCard } from './model.js';
export function seedData() {
  const questions = [{ id:'two-sum', title:'Two Sum', difficulty:'Easy', tags:'Arrays, Hash map', url:'https://leetcode.com/problems/two-sum/', language:'Java', context:'Find two distinct indices whose values add up to the target. Exactly one valid pair exists.\n\nExample\nnums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\n\nYou cannot use the same element twice.', notes:'Return indices, not values. Try a duplicate-value example before coding.', solution:'Scan left to right. Before storing each number, look for its complement in a map of previously seen values. A match gives two distinct indices.\n\nExpected time: O(n)\nExtra space: O(n)', code:`import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] {seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        throw new IllegalArgumentException("No valid pair");
    }
}` }, { id:'valid-parentheses', title:'Valid Parentheses', difficulty:'Easy', tags:'Stack, Strings', url:'https://leetcode.com/problems/valid-parentheses/', language:'Java', context:'Determine whether a string of brackets (), [], and {} is balanced. Every closing bracket must match the latest unmatched opening bracket.\n\n"([])" → true\n"([)]" → false', notes:'At the end, the stack must be empty. An unexpected closing bracket is invalid.', solution:'Push opening brackets onto a stack. For each closing bracket, pop and check the matching opener. Reject mismatches or an empty stack.\n\nTime: O(n)\nSpace: O(n)', code:`import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((c == ')' && open != '(') ||
                    (c == ']' && open != '[') ||
                    (c == '}' && open != '{')) return false;
            }
        }
        return stack.isEmpty();
    }
}` }];
  const cards = [
    newCard('two-sum','What pattern finds a pair with a target sum in one pass?','Use a hash map of previously seen values and their indices. Look up target − current value.','Pattern recognition'),
    newCard('two-sum','Why check the complement before inserting the current value?','To avoid pairing an element with itself. Only previous indices are available during the lookup.'),
    newCard('two-sum','What are the time and space costs of the hash-map solution?','Expected O(n) time with average O(1) hash operations; O(n) extra space.','Complexity'),
    newCard('two-sum','How does [3, 3] with target 6 work?','Store the first 3 at index 0. The second 3 finds that complement, returning [0, 1].','Edge case'),
    newCard('valid-parentheses','Which data structure captures the order of unmatched opening brackets?','A stack: the most recent opening bracket must close first.','Pattern recognition'),
    newCard('valid-parentheses','Why is an empty stack required at the end?','Any remaining opener has no matching closing bracket. The string is incomplete.','Edge case')
  ];
  return { version:1, questions, cards, history:[] };
}
