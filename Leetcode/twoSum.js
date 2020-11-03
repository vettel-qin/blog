const twoSum = (nums, target) => {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    } else {
      map.set(nums[i], i);
    }
  }

  return []
}

const nums = [2, 3, 11, 7];
const target = 9;

console.log(twoSum(nums, target)); // [0, 3]