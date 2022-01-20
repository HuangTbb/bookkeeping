import clone from '@/lib/clone';
import dayjs from 'dayjs';
import store from '@/store';


function groupedList(type: string) {
  store.commit('fetchRecords');
  const recordList = (store.state as RootState).recordList;

  const newList = clone(recordList)
    .filter(r => r.type === type)
    .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

  if (newList.length === 0) {return [];}
  // eslint-disable-next-line no-undef
  const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]], totalMoney: 0}];
  for (let i = 1; i < newList.length; i++) {
    const current = newList[i];
    const last = result[result.length - 1];
    if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
      last.items.push(current);
    } else {
      result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current], totalMoney: 0});

    }
  }
  countTotalMoney(result)
  return result;
}

function countTotalMoney(result: Result){
  let totalTemp = 0;
  result.map(group => {
    group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    group.items.map(item=>{
      totalTemp += item.amount;
    })
  });
  result.map(group => {
    group.totalMoney = Math.floor(totalTemp * 100) / 100;
  });
}
export default groupedList;