


/////////////////////////////
11.1-2
A bit vector is simply an array of bits (each either 0 or 1). A bit vector of length m takes much less space than an array of m pointers. Describe how to use a bit vector to represent a dynamic set of distinct elements drawn from the set {0, 1, ..., m − 1} and with no satellite data. Dictionary operations should run in O(1) time.

11.1-3
Suggest how to implement a direct-address table in which the keys of stored elements do not need to be distinct and the elements can have satellite data. All three dictionary operations (INSERT, DELETE, and SEARCH) should run in O(1) time. (Don’t forget that DELETE takes as an argument a pointer to an object to be deleted, not a key.)

11.1-4
Suppose that you want to implement a dictionary by using direct addressing on a huge array. That is, if the array size is m and the dictionary contains at most n elements at any one time, then m >> n. At the start, the array entries may contain garbage, and initializing the entire array is impractical because of its size. Describe a scheme for implementing a direct-address dictionary on a huge array. Each stored object should use O(1) space; the operations SEARCH, INSERT, and DELETE should take O(1) time each; and initializing the data structure should take O(1) time. (Hint: Use an additional array, treated somewhat like a stack, whose size is the number of keys actually stored in the dictionary, to help determine whether a given entry in the huge array is valid or not.)
/////////////////////////////
