@cache = {}

def fib(n)
  return 0 if n == 0
  return 1 if n == 1
  a = @cache[n - 1] || @cache[n - 1] = fib(n - 1)
  b = @cache[n - 2] || @cache[n - 2] = fib(n - 2)
  a + b
end

@fib_series = (1..100).map { |n| fib(n) }

def isFib(n)
  @fib_series.include?(n)
end

lines = $stdin.read.lines.to_a
lines.shift
lines.each do |int|
  puts isFib(int.to_i) ? 'IsFibo' : 'IsNotFibo'
end

