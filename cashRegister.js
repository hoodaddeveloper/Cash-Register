let denom = [
  { name: 'ONE HUNDRED', val: 100.00 },
  { name: 'TWENTY', val: 20.00 },
  { name: 'TEN', val: 10.00 },
  { name: 'FIVE', val: 5.00 },
  { name: 'ONE', val: 1.00 },
  { name: 'QUARTER', val: 0.25 },
  { name: 'DIME', val: 0.10 },
  { name: 'NICKEL', val: 0.05 },
  { name: 'PENNY', val: 0.01 }
];

function checkCashRegister(price, cash, cid) {
  let output = { status: null, change: [] };
  let change = cash - price;

  let register = cid.reduce(function (acc, curr) {
    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
  }, { total: 0 });

  if (register.total === change) {
    output.status = 'CLOSED';
    output.change = cid;
    return output;
  }

  if (register.total < change) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }

  let change_arr = denom.reduce(function (acc, curr) {
    let value = 0;
    while (register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;

      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      acc.push([curr.name, value]);
    }
    return acc;
  }, []);

  if (change_arr.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }

  output.status = 'OPEN';
  output.change = change_arr;
  return output;
}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);