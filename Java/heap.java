//**
// big heap
// sorted array is asc
//**
public class heap{
	public static void main(String[] args){
		int[] arr = new int[]{7,3,8,5,1,2};
		for(int i=0;i<arr.length;i++){
			toHeap(arr, arr.length-i);
			System.out.println(i);
			for(int e: arr) System.out.print(e+" ");
			System.out.println();
			swap(arr, 0, arr.length-i-1);
			for(int e: arr) System.out.print(e+" ");
			System.out.println();
		}
	}

	static void swap(int[] arr, int x, int y){
		int tmp = arr[x];
		arr[x] = arr[y];
		arr[y] = tmp;
	}

	static void toHeap(int[] arr, int end){
		int len = end;
                for(int i=len/2-1;i>=0;i--){
                        int left = i*2+1;
                        int right = i*2+2;
                        if(left<len){
                                if(arr[i]<arr[left]){
                                        swap(arr, i, left);
					verify(arr, left, end);
                                }
                        }
                        if(right<len){
                                if(arr[i]<arr[right]){
                                        swap(arr ,i, right);
					verify(arr, right, end);
				}
			}
                }

	}

	static void verify(int[] arr, int i, int end){
		if(2*i+1>=end && 2*i+2>=end) return;
		if(2*i+1<end && arr[i]<arr[2*i+1]) {
			swap(arr, i, 2*i+1);
			verify(arr, 2*i+1, end);
		}
		if(2*i+2<end && arr[i]<arr[2*i+2]){
			swap(arr, i, 2*i+2);
			verify(arr, 2*i+2, end);
		}
	}

}
