public class mergeCount{
	// 使用归并排序解决逆序数对的问题
	// 在数组中，左边出现的数字比右边出现的数字大时，称为一个逆序对
	// 例如，[2,3,4,5,0]
	// 逆序对：[2,0],[3,0],[4,0],[5,0]，则结果为 4 对
	public static void main(String[] args){
		int[] arr = new int[]{2,3,4,5,0};
		int c = process(arr, 0, arr.length-1);
		// for(int i: arr) System.out.println(i);
		System.out.println(c);
	}
	// 递归处理每个分块
	static int process(int[] arr, int left, int right){
		if(left==right) return 0;
		int mid = left+((right-left)>>1);
		return process(arr, left, mid) + process(arr, mid+1, right) + merge(arr, left, right);
	}
	// 有序合并两个分块的数据, 合并时顺便统计逆序数对
	static int merge(int[] arr, int left, int right){
		int res = 0;
		int loc = 0;
		int[] help = new int[right-left+1];
		int mid = left+((right-left)>>1);
		int l = left;
		int r = mid+1;
		while(l<=mid && r<=right){ 
			// 如果当前左边的数大于右边的第一个数，因为两边数组都是排序数组，则左边这个数大于右边所有数，一次性记录数量
			if(arr[l]>arr[r]) res+=right-r+1;
			// 注意出现相等时，先走右边，不然无法计算合并结果
			help[loc++]=arr[l]>arr[r]?arr[l++]:arr[r++];
		}
		while(l<=mid) help[loc++]=arr[l++];
		while(r<=right) help[loc++]=arr[r++];
		for(int i=0;i<help.length;i++) arr[left+i]=help[i];
		return res;
	}
}
