/**
 * 战斗前对话
 */

Crafty.drama( 'beforeFight',  [
	{
		name: '安东',
		face: 'depressed',
		text: '哼，亨利他们这次任务不也没成功吗。就因为我还丢了契约书就嘲笑我，真是可恶。',
		action: 'show',
		pos: 'left'
	},
	{
		name: '安东',
		face: 'depressed',
		text: '我就不信了,将来我一定要成为像爸爸那样伟大的佣兵,连国王都要为我颁发奖章！',
		action: 'hide',
		pos: 'left'
	},
	{
		name: '夏尔蒂',
		face: 'sad',
		text: '马已经跑不动了, 明明盖迪尔联邦就在眼前...可恶',
		action: 'show',
		pos: 'left'
	},
	{
		name: '维纶骑士',
		face: 'smile',
		text: '哈哈!公主你还是不要跑了,集市买的马就算你骑术再好怎么跑得过我们的军马! ',
		action: 'show',
		pos: 'right'
	},
	{
		name: '维纶骑士',
		face: 'smile',
		text: '您还是老老实实和我们回去吧, 我们保证不伤害你~ ',
		action: 'hide',
		pos: 'right'
	},
	{
		name: '维纶军官',
		face: 'normal',
		text: '不要和她罗嗦了，上面的命令可不是让我们“接”她回去',
		action: 'show',
		pos: 'right'
	},
	{
		name: '维纶军官',
		face: 'normal',
		text: '快点解决她 这边已经是盖迪尔联邦的边境了 拖久了可就麻烦了',
		action: 'hide',
		pos: 'right'
	},
	{
		name: '维纶骑士',
		face: 'smile',
		text: '额...真是不懂的情调的家伙 公主您也听到了 可不要怪我没有风度啊 蛤蛤蛤蛤蛤 ',
		action: 'show',
		pos: 'right'
	},
	{
		name: '夏尔蒂',
		face: 'sad',
		text: '哼！不要废话了，我是不会和你们回去的！ 真要打起来我也不会怕了你们！',
		action: 'hide',
		pos: 'left'
	},
	{
		name: '安东',
		face: 'surprised',
		text: '好像有人在欺负美女啊...这种英雄救美的俗套情节竟然被我遇上了 不行不能让这些兵痞子欺负美女 ',
		action: 'show',
		pos: 'left'
	},
	{
		name: '安东',
		face: 'serious',
		text: '不行不能让这些兵痞子欺负美女 ',
		pos: 'left'
	},
	{
		name: '安东',
		face: 'serious',
		text: '喂！你们是哪个国家的骑士 这里已经是盖迪尔联邦的领土了 ',
		pos: 'left'
	},
	{
		name: '安东',
		face: 'serious',
		text: '除了联邦授权的佣兵团和联邦军队 任何携带武器的人都是不受欢迎的 识相的就快点给我滚！ ',
		pos: 'left'
	},
	{
		name: '维纶骑士',
		face: 'angry',
		text: '我去 你丫一毛都没长全的小屁孩知道什么啊 还有对面那个女的也拿着武器呢 你怎么不说她啊 ',
		pos: 'right'
	},
	{
		name: '安东',
		face: 'smile',
		text: '有吗？哪里？噢 你说她啊 人家那把佩剑是装饰用的了 怎么能算是武器呢！ ',
		action: 'hide',
		pos: 'left'
	},
	{
		name: '夏尔蒂',
		face: 'sad',
		text: '。。。。。。。。',
		action: 'show',
		pos: 'left'
	},
	{
		name: '维纶骑士',
		face: 'depressed',
		text: '。。。。。。 ',
		action: 'hide',
		pos: 'right'
	},
	{
		name: '维纶军官',
		face: 'normal',
		text: '小子 既然你找死 那就不要怪我们心狠手辣了 喂 快点解决他带走公主省的夜长梦多',
		action: 'show',
		pos: 'right'
	}
]);

/**
 * 战斗后对话
 */
Crafty.drama('afterFigher', [
	{
		name: '维纶骑士',
		face: 'angry',
		text: '可恶 算你们狠 我们的大部队马上就要到了 到时候 就把你们一起收拾了 有种就不要跑！哼',
		pos: 'right'
	},
	{
		name: '安东',
		face: 'surprised',
		text: '自己跑得比谁都快还要叫别人不要跑... ',
		pos: 'right'
	},
	{
		name: '夏尔蒂',
		face: 'shy',
		text: '这次多亏了你了 不然真是不知道怎么办了',
		pos: 'right'
	},
	{
		name: '安东',
		face: 'shy',
		text: '额 其实 我发现你自己都能应付那两个人 我纯粹打酱油了... ',
		pos: 'right'
	},
	{
		name: '夏尔蒂',
		face: 'normal',
		text: '..还是要谢谢你 对了刚听你说话 你认识联邦里的佣兵吗',
		pos: 'right'
	},
	{
		name: '安东',
		face: 'smile',
		text: '哈哈 我就是疾风之狼的呢 疾风之狼你听过吧 很给力的！ ',
		pos: 'right'
	},
	{
		name: '夏尔蒂',
		face: 'smile',
		text: '太好了 那你能带我去见你们的团长吗 我有事想拜托他',
		pos: 'right'
	},
	{
		name: '安东',
		face: 'smile',
		text: '好！没问题！跟我走吧！ ',
		pos: 'right'
	}
]);