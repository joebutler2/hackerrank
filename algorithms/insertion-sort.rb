# Can we cheat and use mergesort?
# doesn't seem so, idk how this guy was able to do it
# https://www.hackerrank.com/challenges/insertion-sort/forum/questions/4651
#
# Other notable approaches https://www.hackerrank.com/challenges/insertion-sort/forum/questions/3478

@count = 0

def merge_sort(col)
  return col if col.size <= 1
  mid = col.size / 2
  left, right = col[0, mid], col[mid, col.length - 1]
  merge(merge_sort(left), merge_sort(right))
end

def merge(left, right)
  return right.empty? ? left : right if left.empty? || right.empty?
  smallest = if left.first <= right.first
               left.shift
             else
               right.shift
               @count += 1
             end
  merge(left, right).unshift(smallest)
end

lines = $stdin.read.lines.to_a
lines.shift

lines.each_with_index do |line, index|
  next if index % 2 == 0
  elems = line.chomp.split(/ /).map(&:to_i)
  p merge_sort(elems)
  puts @count
  @count = 0
end

