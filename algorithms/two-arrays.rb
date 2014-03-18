lines = $stdin.read.lines.to_a
lines.shift

class Array
  def in_groups_of(number, fill_with = nil)
    if fill_with == false
      collection = self
    else
      # size % number gives how many extra we have;
      # subtracting from number gives how many to add;
      # modulo number ensures we don't add group of just fill.
      padding = (number - size % number) % number
      collection = dup.concat([fill_with] * padding)
    end

    if block_given?
      collection.each_slice(number) { |slice| yield(slice) }
    else
      groups = []
      collection.each_slice(number) { |group| groups << group }
      groups
    end
  end
end

lines.in_groups_of(3) do |lines|
  _, k = lines[0].split(/ /).map(&:to_i)
  array_a = lines[1].split(/ /).map(&:to_i)
  array_b = lines[2].split(/ /).map(&:to_i)
  arrangement_exists = 'NO'

  array_a = array_a.sort
  array_b = array_b.sort_by {|n| -n}

  truth_array = []
  for i in 0...array_b.length
    truth_array[i] = array_a[i] + array_b[i] >= k
  end
  arrangement_exists = 'YES' if truth_array.all?

  array_a = array_a.sort_by {|n| -n}
  array_b = array_b.sort

  truth_array = []
  for i in 0...array_b.length
    truth_array[i] = array_a[i] + array_b[i] >= k
  end
  arrangement_exists = 'YES' if truth_array.all?

  puts arrangement_exists
end
