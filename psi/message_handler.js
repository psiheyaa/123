var gameLoaded = false;
var log = "";
var logDownloaded = false;

 const wax = new waxjs.WaxJS({ rpcEndpoint: 'https://wax.pink.gg', tryAutoLogin: false });


  async function login() { 
    try { 
        const userAccount = await wax.login();  
    } catch(e) { 

    } 
} 




const getMineDelay = async function (account) {
  try {
    const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
    const land = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    const params = getBagMiningParams(bag);
    const land_params = getLandMiningParams(land);
    params.delay *= land_params.delay / 10;
    params.difficulty += land_params.difficulty;
    var minedelay = await getNextMineDelay(
      mining_account,
      account,
      params,
      wax.api.rpc
    );
    return minedelay;
  } catch (error) {
    return error;
  }
};


const getBagDifficulty = async function (account) {
  try {
    const bag = await getBag(mining_account, account, wax.api.rpc, aa_api);
    const params = getBagMiningParams(bag);
    return params.difficulty;
  } catch (error) {
    return error;
  }
};

const getLandDifficulty = async function (account) {
  try {
    const land = await getLand(
      federation_account,
      mining_account,
      account,
      wax.api.rpc,
      aa_api
    );
    const params = getLandMiningParams(land);
    return params.difficulty;
  } catch (error) {
    return error;
  }
};

const background_mine = async (account) => {
  return new Promise(async (resolve, reject) => {
    const bagDifficulty = await getBagDifficulty(account);
    const landDifficulty = await getLandDifficulty(account);
    let difficulty = bagDifficulty + landDifficulty;
    console.log('difficulty', difficulty);

    console.log('start doWork = ' + Date.now());
    const last_mine_tx = await lastMineTx(mining_account, account, wax.api.rpc);

    doWorkWorker({ mining_account, account, difficulty, last_mine_tx }).then(
      (mine_work) => {
        console.log('end doWork = ' + Date.now());
        resolve(mine_work);
      }
    );
  });
};



async function add_event(Event) {
  try {
    log += Event + '\n';
  }
  finally {
    console.log(log);
  }
}


  function openURL(url) {
    window.open(url)
  }