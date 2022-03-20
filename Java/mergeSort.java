public class mergeSort{
	// 归并排序
	public static void main(String[] args){
		int[] arr = new int[]{2,3,4,5,1};
		process(arr, 0, arr.length-1);
		for(int i: arr) System.out.println(i);
	}
	// 递归处理每个分块
	static void process(int[] arr, int left, int right){
		if(left==right) return;
		int mid = left+((right-left)>>1);
		process(arr, left, mid);
		process(arr, mid+1, right);
		merge(arr, left, right);
	}
	// 有序合并两个分块的数据
	static void merge(int[] arr, int left, int right){
		int loc = 0;
		int[] help = new int[right-left+1];
		int mid = left+((right-left)>>1);
		int l = left;
		int r = mid+1;
		while(l<=mid && r<=right) 
			help[loc++]=arr[l]<=arr[r]?arr[l++]:arr[r++];
		while(l<=mid) help[loc++]=arr[l++];
		while(r<=right) help[loc++]=arr[r++];
		for(int i=0;i<help.length;i++) arr[left+i]=help[i];
	}
}
