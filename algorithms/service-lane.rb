lines = $stdin.read.lines.to_a
lines.shift
width = lines.shift.chomp.split(/ /).map(&:to_i)

lines.each do |pair|
  i, j = pair.split(/ /).map(&:to_i)
  puts width[i..j].min
end

