/** 
 * # Problem:
 * You use a hash function h to hash n distinct keys into an array T of length m. Assuming independent uniform hashing, 
 * what is the expected number of collisions? More precisely, what is the expected cardinality of {{k1, k2} : k1 ≠ k2 and h(k1) = h(k2)}?
 * 
 * # My Approach:
 * - m potential slots. Hash function can map keys to m distinct slots. 1/m probability that any two distinct keys hash to the same slot.
 * - n(n-1)/2 total number of unique pairs of keys.
 * - n(n-1)/2m expected number of collisions in independent uniform hashing case.
 * 
 * @namespace Expected_Number_Of_Collisions
*/