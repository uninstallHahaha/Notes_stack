

public class HeapStructure {
    public int cap = 0;
    public int[] arr = new int[5];

    public static void main(String[] args) {
        HeapStructure heap = new HeapStructure();
        heap.offer(2);
        heap.offer(4);
        heap.offer(5);
        heap.offer(7);
        heap.offer(1);
        while (!heap.isEmpty()) {
            System.out.println(heap.poll());
        }
    }

    public boolean isEmpty() {
        return cap == 0;
    }

    public void offer(int n) {
        cap++;
        arr[cap - 1] = n;
        sickUp();
    }

    public int poll() {
        int res = arr[0];
        swap(arr, 0, --cap);
        sickDown(0);
        return res;
    }

    public int peek() {
        return arr[0];
    }

    private void sickDown(int index) {
        int left = index * 2 + 1;
        while (left < cap) {
            int smallerIndex = left + 1 < cap && arr[left+1] < arr[left] ? left+1 : left ;
            smallerIndex = arr[index] < arr[smallerIndex] ? index : smallerIndex;
            if (index == smallerIndex) {
                break;
            }
            swap(arr, index, smallerIndex);
            index = smallerIndex;
            left = index * 2 + 1;
        }
    }

    private void sickUp() {
        int loc = cap - 1;
        while (loc > 0) {
            int parentLoc = (loc - 1) / 2;
            if (arr[loc] < arr[parentLoc]) {
                swap(arr, loc, parentLoc);
                loc = (loc - 1) / 2;
            } else
                break;
        }
    }

    private void swap(int[] arr, int x, int y) {
        int tmp = arr[x];
        arr[x] = arr[y];
        arr[y] = tmp;
    }

}
