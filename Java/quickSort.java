public class quickSort{
	
	public static void main(String[] args){
		int[] arr = new int[]{3,2,4,5,1};
		sort(arr, 0, arr.length-1);
		for(int i: arr) System.out.println(i);
	}

	static void sort(int[] arr, int left, int right){
		if(left<right){
			int i = left;
			int j = right;
			// int x = arr[(int)(Math.random()*(right-left+1))];
			int x = arr[i];
			while(i<j){
				while(i<j && arr[j]>x) j--;
				if(i<j) arr[i++]=arr[j];
				while(i<j && arr[i]<x) i++;
				if(i<j) arr[j--]=arr[i];			
			}
			arr[i] = x;
			sort(arr, left, i-1);
			sort(arr, i+1, right);
		}
		
	}
}
