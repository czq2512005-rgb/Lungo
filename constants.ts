
import { Category, MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- Scones ---
  {
    id: 'scone-1',
    nameEn: 'Scone (Original/ Earl Grey/ Hojicha/ Rum Raisin)',
    nameZh: '司康餅 (原味/伯爵茶味/焙茶味/蘭姆酒葡萄乾味)',
    descriptionEn: 'Served with Clotted Cream and Earl Grey Peach Jam',
    descriptionZh: '配凝脂奶油和伯爵茶桃果醬',
    price: 42,
    category: Category.Scone,
    image: 'https://images.unsplash.com/photo-1588165171080-c89ac148c349?auto=format&fit=crop&w=600&q=80'
  },

  // --- Cream Cheese Bagels ---
  {
    id: 'cc-1',
    nameEn: 'Cream Cheese Bagel (Plain/ All in One/ Cinnamon/ Blueberry)',
    nameZh: '奶油乳酪貝果 (原味/全能/肉桂/藍莓奶油起司口味)',
    price: 40,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1585478684894-a9e5fa050c2e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cc-2',
    nameEn: 'Bagel with Nutella',
    nameZh: '榛果巧克力醬貝果',
    price: 45,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1634825920808-72b1d3d015c0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cc-3',
    nameEn: 'Bagel with Earl Grey Peach Jam',
    nameZh: '伯爵茶桃子果醬貝果',
    price: 45,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cc-4',
    nameEn: 'Bagel with Peanut Butter (Condensed Milk)',
    nameZh: '花生醬貝果（煉乳）',
    price: 45,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1509456592530-5d38e33f3fdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cc-5',
    nameEn: 'Cinnamon With Honey & Butter',
    nameZh: '肉桂蜂蜜奶油貝果',
    price: 45,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cc-6',
    nameEn: 'Bagel with Black Truffle Sauce',
    nameZh: '黑松露醬貝果',
    price: 50,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1598254267673-c625345a9682?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cc-7',
    nameEn: 'Bagel with Mentaiko Cream Cheese',
    nameZh: '明太子奶油起司貝果',
    price: 55,
    category: Category.Bagel,
    image: 'https://images.unsplash.com/photo-1559929285-d81643f87c47?auto=format&fit=crop&w=600&q=80'
  },

  // --- Salad ---
  {
    id: 'salad-1',
    nameEn: 'Smoked Salmon Salad',
    nameZh: '煙燻鮭魚沙律',
    price: 65,
    category: Category.Salad,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'salad-2',
    nameEn: 'Pastrami & Guacamole Salad',
    nameZh: '煙燻牛肉佐酪梨沙律',
    price: 65,
    category: Category.Salad,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'salad-3',
    nameEn: 'Avocado & Guacamole Salad',
    nameZh: '酪梨佐酪梨醬沙律',
    price: 70,
    category: Category.Salad,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'salad-4',
    nameEn: 'Parma Ham & Ham Salad',
    nameZh: '帕瑪火腿佐火腿沙律',
    price: 75,
    category: Category.Salad,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'salad-5',
    nameEn: 'Smoked Salmon with Mentaiko sauce',
    nameZh: '煙燻鮭魚佐明太子醬沙律',
    price: 75,
    category: Category.Salad,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },

  // --- Bagel Sandwiches ---
  {
    id: 'bs-1',
    nameEn: 'Chicken & Wasabi Mayonnaise',
    nameZh: '雞肉佐芥末蛋黃醬貝果',
    price: 56,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1627308595186-e8d461cdb8cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-2',
    nameEn: 'Chicken & Honey Mustard',
    nameZh: '雞肉佐蜂蜜芥末醬貝果',
    price: 56,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1550507992-eb63face8e59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-3',
    nameEn: 'Chicken & Tom Yum Sauce',
    nameZh: '雞肉佐冬蔭功醬',
    price: 58,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1621252037596-f30c333069c9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-4',
    nameEn: 'Chicken & Green Curry',
    nameZh: '雞肉配綠咖哩',
    price: 58,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-5',
    nameEn: 'Chicken & Mentaiko Cream Cheese',
    nameZh: '雞肉佐明太奶油起司',
    price: 68,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-6',
    nameEn: 'Ham & Cheese',
    nameZh: '火腿佐起司',
    price: 56,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1490226343516-95725e243916?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-7',
    nameEn: 'Ham & Black Truffle Sauce',
    nameZh: '火腿佐黑松露醬',
    price: 62,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1616035048256-4d22dd9098c1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-8',
    nameEn: 'Pastrami & Guacamole',
    nameZh: '煙燻牛肉佐酪梨醬',
    price: 58,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1634825920701-d30d47345f26?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-9',
    nameEn: 'Pastrami & Tom Yum Sauce',
    nameZh: '煙燻牛肉佐冬蔭功醬',
    price: 60,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-10',
    nameEn: 'Smoked Salmon & Onion',
    nameZh: '煙燻鮭魚佐洋蔥',
    price: 58,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1521513919009-be99283e63f9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-11',
    nameEn: 'Smoked Salmon & Wasabi Mayonnaise',
    nameZh: '煙燻鮭魚佐芥末蛋黃醬',
    price: 62,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-12',
    nameEn: 'Smoked Salmon & Honey Mustard',
    nameZh: '煙燻鮭魚佐蜂蜜芥末醬',
    price: 62,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1550507992-eb63face8e59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-13',
    nameEn: 'Smoked Salmon & Black Truffle Mayonnaise',
    nameZh: '煙燻鮭魚佐黑松露蛋黃醬',
    price: 66,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1598254267673-c625345a9682?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-14',
    nameEn: 'Smoked Salmon & Mentaiko Cream Cheese',
    nameZh: '煙燻鮭魚搭配明太子奶油起司',
    price: 70,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-15',
    nameEn: 'Kabayaki Eel & Wasabi Mayonnaise',
    nameZh: '蒲燒鰻魚佐芥末蛋黃醬',
    price: 112,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1616035048256-4d22dd9098c1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-16',
    nameEn: 'Duck Breast & Green Curry',
    nameZh: '鴨胸肉配綠咖哩',
    price: 66,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1634825920701-d30d47345f26?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-17',
    nameEn: 'Duck Breast & Tom Yum Sauce',
    nameZh: '鴨胸肉佐冬蔭功醬',
    price: 66,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-18',
    nameEn: 'Avocado & Guacamole',
    nameZh: '牛油果配酪梨醬',
    price: 62,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1550507992-eb63face8e59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-19',
    nameEn: 'Avocado & Green Curry',
    nameZh: '酪梨綠咖哩',
    price: 64,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1621252037596-f30c333069c9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-20',
    nameEn: 'Mario (Portobello & Cheese with Honey Mustard)',
    nameZh: '馬裡奧（波多貝羅蘑菇起司配蜂蜜芥末醬）',
    price: 68,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1598254267673-c625345a9682?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-21',
    nameEn: 'Black Mario (Portobello & Cheese with Black Truffle Sauce)',
    nameZh: '黑馬裡奧（波多貝羅蘑菇起司配黑松露醬）',
    price: 74,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1521513919009-be99283e63f9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-22',
    nameEn: 'Parma Ham & Dill',
    nameZh: '帕瑪火腿蒔蘿',
    price: 64,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1550507992-eb63face8e59?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bs-23',
    nameEn: 'Classic American (Bacon & Egg with Mayonnaise)',
    nameZh: '經典美式（培根蛋配蛋黃醬）',
    price: 74,
    category: Category.Sandwich,
    image: 'https://images.unsplash.com/photo-1490226343516-95725e243916?auto=format&fit=crop&w=600&q=80'
  },

  // --- All Day Breakfast ---
  {
    id: 'adb-1',
    nameEn: 'Classic Breakfast',
    nameZh: '經典早餐',
    descriptionEn: 'Portobello, Nuremberg Sausage, Bacon, Scrambled Egg, Ultimate Baked Beans, Half Blueberry Bagel, Mixed Veggie',
    descriptionZh: '波多貝羅蘑菇、紐倫堡香腸、培根、炒蛋、終極烤豆、半藍莓貝果、什錦蔬菜',
    price: 94,
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adb-2',
    nameEn: 'Veggie Breakfast',
    nameZh: '素食早餐',
    descriptionEn: 'Portobello, Scrambled Egg, Asparagus, Avocado, Guacamole, Ultimate Baked Beans, Half Blueberry Bagel, Mixed Veggie',
    descriptionZh: '波多貝羅蘑菇、炒蛋、蘆筍、酪梨、酪梨醬、終極烤豆、半顆藍莓貝果、什錦蔬菜',
    price: 114,
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1533089862017-ec14e6b7d036?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adb-3',
    nameEn: 'American Breakfast',
    nameZh: '美式早餐',
    descriptionEn: 'Portobello, Nuremberg Sausage, Bacon, Scrambled Egg, Ultimate Baked Beans, Half Blueberry Bagel, Cheese Krainer, Smoked Salmon',
    descriptionZh: '波多貝羅蘑菇、紐倫堡香腸、培根、炒蛋、終極烤豆、半個藍莓貝果、起司捲、煙燻鮭魚',
    price: 114,
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adb-4',
    nameEn: 'Monster Breakfast',
    nameZh: '大麥克早餐',
    descriptionEn: 'Portobello, Nuremberg Sausage, Bacon, Scrambled Egg, Ultimate Baked Beans, Half Blueberry Bagel, Cheese Krainer, Smoked Salmon, Pastrami, Mixed Veggie',
    descriptionZh: '波多貝羅蘑菇、紐倫堡香腸、培根、炒蛋、終極烤豆、半藍莓貝果、起司捲、煙燻鮭魚、煙燻牛肉、什錦蔬菜',
    price: 124,
    category: Category.Breakfast,
    image: 'https://images.unsplash.com/photo-1475090169767-40ed8d18f5d8?auto=format&fit=crop&w=600&q=80'
  },

  // --- White Coffee ---
  {
    id: 'dw-1',
    nameEn: 'Cappuccino',
    nameZh: '卡布奇諾',
    price: 42,
    priceIced: 46,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-2',
    nameEn: 'Caffe Latte',
    nameZh: '拿鐵咖啡',
    price: 42,
    priceIced: 46,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1570968992291-764724a98094?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-3',
    nameEn: 'Flat white',
    nameZh: '馥芮白',
    price: 42,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-4',
    nameEn: 'Magic (Double Risteretto Flat White)',
    nameZh: '魔法馥芮白（雙份濃縮咖啡）',
    price: 42,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-5',
    nameEn: 'S.O. Caffe Latte (single Origin)',
    nameZh: '單品拿鐵咖啡',
    price: 46,
    priceIced: 50,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1555581403-bb4d6428d00a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-6',
    nameEn: 'Dirty',
    nameZh: '髒髒拿鐵',
    price: 46,
    priceIced: 46,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1595928607633-911a7a0de31d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-7',
    nameEn: 'Ice Drip Latte',
    nameZh: '冰滴拿鐵',
    price: 55,
    priceIced: 55,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1499961024600-ad094dbc305f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dw-8',
    nameEn: 'Baileys Coffee',
    nameZh: '百利甜酒咖啡',
    price: 55,
    priceIced: 55,
    category: Category.DrinkWhite,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1544253132-772a444b4943?auto=format&fit=crop&w=600&q=80'
  },

  // --- Black Coffee ---
  {
    id: 'db-1',
    nameEn: 'Espresso / S.O.E',
    nameZh: '濃縮咖啡 / 特濃咖啡',
    price: 30,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-2',
    nameEn: 'Long Black',
    nameZh: '美式長黑咖啡',
    price: 40,
    priceIced: 44,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-3',
    nameEn: 'Single Origin Black',
    nameZh: '單品黑咖啡',
    price: 42,
    priceIced: 46,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-4',
    nameEn: 'Blue Monday (Ice Drip w/ Tonic)',
    nameZh: '藍色星期一 (冰滴加湯力水)',
    price: 55,
    priceIced: 55,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-5',
    nameEn: 'Espresso Tonic',
    nameZh: '濃縮咖啡湯力水',
    price: 55,
    priceIced: 55,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1595928607633-911a7a0de31d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-6',
    nameEn: 'Coffee Layer',
    nameZh: '咖啡分層',
    price: 55,
    priceIced: 55,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-7',
    nameEn: 'Ice Drip',
    nameZh: '冰滴咖啡',
    price: 55,
    priceIced: 55,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b5c7dd8b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-8',
    nameEn: 'Lemon Black (Ice Drip/ Lemonade)',
    nameZh: '檸檬黑咖啡（冰滴/檸檬黑咖啡）',
    price: 55,
    priceIced: 55,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'db-9',
    nameEn: 'Pour Over',
    nameZh: '手沖咖啡',
    price: 70,
    category: Category.DrinkBlack,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1550951298-5c7b95a66b90?auto=format&fit=crop&w=600&q=80'
  },

  // --- Tea ---
  {
    id: 'dt-1',
    nameEn: 'French Earl Grey',
    nameZh: '法式伯爵茶',
    price: 55,
    category: Category.DrinkTea,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231844f74?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dt-2',
    nameEn: 'English Breakfast',
    nameZh: '英式早餐茶',
    price: 55,
    category: Category.DrinkTea,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dt-3',
    nameEn: 'Chamomile',
    nameZh: '洋甘菊茶',
    price: 55,
    category: Category.DrinkTea,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dt-4',
    nameEn: 'Lemongrass & Ginger',
    nameZh: '檸檬薑茶',
    price: 55,
    category: Category.DrinkTea,
    isDrink: true,
    availableVariants: ['Hot'],
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80'
  },

  // --- Non-Coffee ---
  {
    id: 'dn-1',
    nameEn: 'Jasmine Green Tea Latte',
    nameZh: '茉莉綠茶拿鐵',
    price: 55,
    priceIced: 55,
    category: Category.DrinkNonCoffee,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1515442261630-184ed4861bf0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dn-2',
    nameEn: 'Osmanthus Oolong Latte',
    nameZh: '桂花烏龍茶拿鐵',
    price: 55,
    priceIced: 55,
    category: Category.DrinkNonCoffee,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dn-3',
    nameEn: 'Homemade Lemonade',
    nameZh: '自製檸檬水',
    price: 50,
    priceIced: 50,
    category: Category.DrinkNonCoffee,
    isDrink: true,
    availableVariants: ['Iced'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dn-4',
    nameEn: 'Chocolate',
    nameZh: '巧克力',
    price: 50,
    priceIced: 50,
    category: Category.DrinkNonCoffee,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dn-5',
    nameEn: 'Baileys Chocolate',
    nameZh: '百利甜酒巧克力',
    price: 55,
    priceIced: 55,
    category: Category.DrinkNonCoffee,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1626078298715-62d29994c6ac?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dn-6',
    nameEn: 'Black Sesame Latte',
    nameZh: '黑芝麻拿鐵',
    price: 55,
    priceIced: 55,
    category: Category.DrinkNonCoffee,
    isDrink: true,
    availableVariants: ['Hot', 'Iced'],
    image: 'https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&w=600&q=80'
  },

  // --- Merchandise ---
  {
    id: 'm-1',
    nameEn: 'Lungo Tote Bag',
    nameZh: 'Lungo 帆布袋',
    price: 120,
    category: Category.Merch,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm-2',
    nameEn: 'Coffee Beans (200g)',
    nameZh: '咖啡豆 (200克)',
    price: 180,
    category: Category.Merch,
    image: 'https://images.unsplash.com/photo-1559525839-813e31e6fa0f?auto=format&fit=crop&w=600&q=80'
  }
];
