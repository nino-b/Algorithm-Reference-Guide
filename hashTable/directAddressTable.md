<h1>Direct-Address Table</h1>

- Values are strictly numeric.
- Keys are the same as values.
- Direct-Address Table is an array where value occupies the index (key) that is equal to value.
- In other words, Direct-Address Table maps set of numbers to the corresponding keys in the array. And length of the array equals to or is more than number of elements in the set.
- <b>O(1)</b>: search, insert and delete operations have constant time complexity, because we directly access the item.

<h2>Hash Table</h2>

- In JS we can mimic Direct-Address Table with <b>Map</b> or an <b>object</b> with non numeric values too, but it represents more like Hash Table or something similar, but not Direct-Address Table in classical sense (because there keys are not numeric).
- We can use hashing function to turn non numeric values into numeric type and generate keys this way.


/////////////////////////////
11.1-2
A bit vector is simply an array of bits (each either 0 or 1). A bit vector of length m takes much less space than an array of m pointers. Describe how to use a bit vector to represent a dynamic set of distinct elements drawn from the set {0, 1, ..., m − 1} and with no satellite data. Dictionary operations should run in O(1) time.

11.1-3
Suggest how to implement a direct-address table in which the keys of stored elements do not need to be distinct and the elements can have satellite data. All three dictionary operations (INSERT, DELETE, and SEARCH) should run in O(1) time. (Don’t forget that DELETE takes as an argument a pointer to an object to be deleted, not a key.)

11.1-4
Suppose that you want to implement a dictionary by using direct addressing on a huge array. That is, if the array size is m and the dictionary contains at most n elements at any one time, then m >> n. At the start, the array entries may contain garbage, and initializing the entire array is impractical because of its size. Describe a scheme for implementing a direct-address dictionary on a huge array. Each stored object should use O(1) space; the operations SEARCH, INSERT, and DELETE should take O(1) time each; and initializing the data structure should take O(1) time. (Hint: Use an additional array, treated somewhat like a stack, whose size is the number of keys actually stored in the dictionary, to help determine whether a given entry in the huge array is valid or not.)
/////////////////////////////
