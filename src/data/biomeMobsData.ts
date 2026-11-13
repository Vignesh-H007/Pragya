// ============================================================================
// BIOME MOBS & SYLLABUS TESTS DATA ENGINE
// Dynamic syllabus-aligned tests mapped to Minecraft mobs per biome
// ============================================================================

export type BiomeId = 'plains' | 'ocean' | 'nether' | 'end';

export interface MobLootItem {
  name: string;
  icon: string;
  count: number;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface MobQuestion {
  id: string;
  chapter: string;
  conceptTitle: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  mobReactionCorrect: string;
  mobReactionWrong: string;
}

export interface BiomeMob {
  id: string;
  name: string;
  mobType:
    | 'creeper'
    | 'zombie'
    | 'irongolem'
    | 'drowned'
    | 'pufferfish'
    | 'elderguardian'
    | 'blaze'
    | 'piglin'
    | 'ghast'
    | 'enderman'
    | 'shulker'
    | 'enderdragon';
  biome: BiomeId;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Boss';
  maxHearts: number;
  xpReward: number;
  badgeTitle: string;
  introQuote: string;
  victoryQuote: string;
  defeatQuote: string;
  lootDrops: MobLootItem[];
  pedestalBlock: string;
}

// ----------------------------------------------------------------------------
// STATIC MOB PROFILES PER BIOME
// ----------------------------------------------------------------------------
export const BIOME_MOBS: Record<BiomeId, BiomeMob[]> = {
  plains: [
    {
      id: 'mob-plains-zombie',
      name: 'Zombie Scholar',
      mobType: 'zombie',
      biome: 'plains',
      title: 'Overworld Foundation Patrol',
      description: 'Lurks under oak shades carrying an ancient textbook. Tests your foundational rules and negative number concepts.',
      difficulty: 'Beginner',
      maxHearts: 3,
      xpReward: 90,
      badgeTitle: 'Zombie Scholar Defeated',
      introQuote: 'Hrrgh! You shall not cross the oak meadow without solving my foundational test!',
      victoryQuote: 'Urrgh... My textbook dropped! You truly know your curriculum foundations!',
      defeatQuote: 'Braaains... Go back and study the basics before challenging me again!',
      pedestalBlock: 'Dirt & Grass Block',
      lootDrops: [
        { name: 'Rotten Study Notes', icon: '📜', count: 2, rarity: 'common' },
        { name: 'Iron Ingot', icon: '🪙', count: 1, rarity: 'rare' },
        { name: 'Overworld Emerald', icon: '🟢', count: 1, rarity: 'rare' },
      ],
    },
    {
      id: 'mob-plains-creeper',
      name: 'Creeper Alchemist',
      mobType: 'creeper',
      biome: 'plains',
      title: 'Explosive Arithmetic Sentry',
      description: 'Hissss... Loves rapid calculation drills! Answer carefully before his knowledge fuse explodes!',
      difficulty: 'Intermediate',
      maxHearts: 3,
      xpReward: 120,
      badgeTitle: 'Fuse Defused: Math Master',
      introQuote: 'Sssss... Ready for an explosive calculation test? Answer right or boom!',
      victoryQuote: 'Sss-click! My fuse extinguished! Take my gunpowder and carry on your quest!',
      defeatQuote: 'BOOM! Study your signs and formulas more closely next time!',
      pedestalBlock: 'Smooth Stone Block',
      lootDrops: [
        { name: 'Gunpowder of Clarity', icon: '💥', count: 3, rarity: 'common' },
        { name: 'Green Emerald', icon: '🟢', count: 2, rarity: 'rare' },
      ],
    },
    {
      id: 'mob-plains-irongolem',
      name: 'Iron Golem Guardian',
      mobType: 'irongolem',
      biome: 'plains',
      title: 'Village Library Protector',
      description: 'Forged from pure iron to guard the villagers’ knowledge repository. Tests deeper conceptual reasoning.',
      difficulty: 'Advanced',
      maxHearts: 4,
      xpReward: 160,
      badgeTitle: 'Golem Certified Scholar',
      introQuote: 'Hrmph. Prove that your mind is as sturdy as bedrock to gain village clearance.',
      victoryQuote: 'Well fought, young scholar. Accept this red poppy of excellence.',
      defeatQuote: 'Your foundation cracked under pressure. Rest and strengthen your skills.',
      pedestalBlock: 'Cobblestone Bricks',
      lootDrops: [
        { name: 'Iron Block Ingot', icon: '🧱', count: 3, rarity: 'rare' },
        { name: 'Poppy of Focus', icon: '🌺', count: 1, rarity: 'common' },
        { name: 'Village Diamond', icon: '💎', count: 1, rarity: 'legendary' },
      ],
    },
  ],

  ocean: [
    {
      id: 'mob-ocean-pufferfish',
      name: 'Pufferfish Sentinel',
      mobType: 'pufferfish',
      biome: 'ocean',
      title: 'Pressure & Decimal Watcher',
      description: 'Inflates when questions get tricky! Tests your mastery over decimals, place values, and unit conversions.',
      difficulty: 'Beginner',
      maxHearts: 3,
      xpReward: 110,
      badgeTitle: 'Pufferfish Depth Swimmer',
      introQuote: 'Puff! Do decimals and place values make you swell up with panic? Let us test you!',
      victoryQuote: '*Deflates gently* Ahh, you kept calm and navigated the decimals with precision!',
      defeatQuote: 'Poof! Watch out for the decimal point spikes! Review the steps!',
      pedestalBlock: 'Prismarine Block',
      lootDrops: [
        { name: 'Pufferfish Quill', icon: '🐡', count: 1, rarity: 'common' },
        { name: 'Water Breathing Flask', icon: '🧪', count: 1, rarity: 'rare' },
      ],
    },
    {
      id: 'mob-ocean-drowned',
      name: 'Drowned Trident Raider',
      mobType: 'drowned',
      biome: 'ocean',
      title: 'Submerged Fraction Spearman',
      description: 'Lurking in aquatic ruins with a glowing trident, testing fraction division and reciprocal depths.',
      difficulty: 'Intermediate',
      maxHearts: 3,
      xpReward: 150,
      badgeTitle: 'Trident Reciprocal Tamer',
      introQuote: 'Gurgle... Only those who divide fractions by their reciprocals survive my trident!',
      victoryQuote: 'Glub... Your math floats high above the surface! Take my oceanic treasures!',
      defeatQuote: 'Sinking down... Remember to invert the second fraction and multiply!',
      pedestalBlock: 'Sea Lantern Block',
      lootDrops: [
        { name: 'Prismarine Shards', icon: '💠', count: 4, rarity: 'common' },
        { name: 'Nautilus Shell', icon: '🐚', count: 1, rarity: 'rare' },
        { name: 'Aquatic Emerald', icon: '🟢', count: 2, rarity: 'rare' },
      ],
    },
    {
      id: 'mob-ocean-elderguardian',
      name: 'Elder Guardian of the Monument',
      mobType: 'elderguardian',
      biome: 'ocean',
      title: 'Ocean Monument Boss',
      description: 'The ancient sovereign of the ocean depths. Casts a test curse demanding mastery over rational numbers & sea depths.',
      difficulty: 'Boss',
      maxHearts: 4,
      xpReward: 220,
      badgeTitle: 'Monument Slayer: Ocean Master',
      introQuote: 'BZZZZT! Feel the pressure of the deep sea! Solve my monument test or suffer Mining Fatigue!',
      victoryQuote: '*Eye dims respectfully* The curse is broken! You have conquered the Oceanic curriculum stage!',
      defeatQuote: 'You succumbed to the oceanic depths. Revisit rational numbers and try again!',
      pedestalBlock: 'Dark Prismarine Monolith',
      lootDrops: [
        { name: 'Wet Sponge of Wisdom', icon: '🧽', count: 1, rarity: 'rare' },
        { name: 'Heart of the Sea', icon: '💙', count: 1, rarity: 'legendary' },
        { name: 'Prismarine Crystals', icon: '✨', count: 3, rarity: 'rare' },
      ],
    },
  ],

  nether: [
    {
      id: 'mob-nether-blaze',
      name: 'Blaze Pyromancer',
      mobType: 'blaze',
      biome: 'nether',
      title: 'Fortress Fireball Warden',
      description: 'Hovers above magma towers firing challenging linear equations and angle questions.',
      difficulty: 'Intermediate',
      maxHearts: 3,
      xpReward: 170,
      badgeTitle: 'Blaze Rod Tamer',
      introQuote: 'Fwoooosh! Can your mind balance an equation before my blaze fireballs strike?',
      victoryQuote: 'Sssss... The fire cooled down! You transposed the variables like a pyromancer!',
      defeatQuote: 'Scorched! Keep both sides of the equation balanced at all costs!',
      pedestalBlock: 'Nether Brick Pillar',
      lootDrops: [
        { name: 'Blaze Rod of Accuracy', icon: '🪄', count: 2, rarity: 'rare' },
        { name: 'Fire Charge Capsule', icon: '🔥', count: 2, rarity: 'common' },
        { name: 'Nether Quartz', icon: '💎', count: 3, rarity: 'common' },
      ],
    },
    {
      id: 'mob-nether-piglin',
      name: 'Piglin Brute Merchant',
      mobType: 'piglin',
      biome: 'nether',
      title: 'Bastion Geometry Barterer',
      description: 'Demands correct answers on parallel lines, transversals, and triangle angles in exchange for golden loot!',
      difficulty: 'Intermediate',
      maxHearts: 3,
      xpReward: 190,
      badgeTitle: 'Bastion Gold Merchant',
      introQuote: 'Oink! No gold? Then give me correct answers to geometric angles or step back!',
      victoryQuote: 'Oink oink! Outstanding geometry trade! Take my precious gold bars!',
      defeatQuote: 'Snort! Unequal angles! Study alternate interior angles again!',
      pedestalBlock: 'Gilded Blackstone',
      lootDrops: [
        { name: 'Nether Gold Ingot', icon: '🥇', count: 3, rarity: 'rare' },
        { name: 'Magma Cream', icon: '🟠', count: 2, rarity: 'common' },
      ],
    },
    {
      id: 'mob-nether-ghast',
      name: 'Ghast of Soul Sand Valley',
      mobType: 'ghast',
      biome: 'nether',
      title: 'Aerial Pythagorean Bomber',
      description: 'Wails high across soul sand valleys, testing triangle properties, exterior angles, and Pythagoras basics.',
      difficulty: 'Advanced',
      maxHearts: 4,
      xpReward: 240,
      badgeTitle: 'Ghast Tear Conqueror',
      introQuote: 'Waaaah! Deflect my aerial math fireballs with the angle sum theorem!',
      victoryQuote: 'Waaaa-h... Fireball reflected! Take my tears of wisdom and conquer The Nether!',
      defeatQuote: 'Waaah! The sum of interior angles in a triangle is always 180°! Never forget!',
      pedestalBlock: 'Soul Sand Slab',
      lootDrops: [
        { name: 'Ghast Tear of Wisdom', icon: '💧', count: 1, rarity: 'legendary' },
        { name: 'Soul Torch', icon: '🕯️', count: 2, rarity: 'common' },
        { name: 'Nether Star Fragment', icon: '⭐', count: 1, rarity: 'rare' },
      ],
    },
  ],

  end: [
    {
      id: 'mob-end-shulker',
      name: 'Shulker Shell Sentry',
      mobType: 'shulker',
      biome: 'end',
      title: 'End City Perimeter Guard',
      description: 'Hides inside a durable shell, shooting levitation bullets that test circle perimeters, areas, and 2πr calculations.',
      difficulty: 'Advanced',
      maxHearts: 3,
      xpReward: 230,
      badgeTitle: 'Shulker Shell Unlocked',
      introQuote: 'Clack-clack! You will levitate uncontrollably unless you calculate the circumference correctly!',
      victoryQuote: 'Shell snaps open in admiration! Your geometric calculations are rock solid!',
      defeatQuote: 'Clack! Remember: Circumference = 2 × π × r! Try again!',
      pedestalBlock: 'Purpur Pillar Block',
      lootDrops: [
        { name: 'Shulker Shell Chest', icon: '📦', count: 1, rarity: 'legendary' },
        { name: 'Levitation Orb', icon: '🫧', count: 2, rarity: 'rare' },
      ],
    },
    {
      id: 'mob-end-enderman',
      name: 'Enderman Void Watcher',
      mobType: 'enderman',
      biome: 'end',
      title: 'Dimensional Ratio Sentinel',
      description: 'Teleports across obsidian islands. Demands high precision in comparing quantities, ratios, and percentages.',
      difficulty: 'Advanced',
      maxHearts: 4,
      xpReward: 260,
      badgeTitle: 'Ender Pearl Navigator',
      introQuote: 'Vwoop... Do not look in my eyes, look at the ratio equation in front of you!',
      victoryQuote: 'Vwoop... *Teleports respectfully* Take this Ender Pearl to traverse the curriculum!',
      defeatQuote: 'Vwoop! Convert ratio to percentage by multiplying by 100! Focus!',
      pedestalBlock: 'End Stone Bricks',
      lootDrops: [
        { name: 'Ender Pearl of Teleportation', icon: '🔮', count: 2, rarity: 'rare' },
        { name: 'Chorus Fruit', icon: '🍇', count: 4, rarity: 'common' },
        { name: 'Void Diamond', icon: '💎', count: 2, rarity: 'legendary' },
      ],
    },
    {
      id: 'mob-end-enderdragon',
      name: 'Ender Dragon Sovereign',
      mobType: 'enderdragon',
      biome: 'end',
      title: 'Apex Grand Syllabus Boss',
      description: 'The supreme ruler of the entire learning realm! Synthesizes questions across all 4 biomes and 12 chapters.',
      difficulty: 'Boss',
      maxHearts: 5,
      xpReward: 400,
      badgeTitle: 'Supreme Curriculum Dragon Slayer',
      introQuote: 'ROOOAAAR! I am the Apex Syllabus Sovereign! Only the most dedicated student can conquer my comprehensive trial!',
      victoryQuote: 'THE ENDER DRAGON HAS BEEN OVERCOME! You have achieved absolute syllabus mastery across all realms!',
      defeatQuote: 'The void consumes your doubts! Revise your journey and face me once again, champion!',
      pedestalBlock: 'Bedrock Portal Core',
      lootDrops: [
        { name: 'Dragon Egg Trophy', icon: '🥚', count: 1, rarity: 'legendary' },
        { name: 'Dragon Breath Elixir', icon: '🧪', count: 2, rarity: 'rare' },
        { name: 'Elytra Wings of Mastery', icon: '🪽', count: 1, rarity: 'legendary' },
      ],
    },
  ],
};

// ----------------------------------------------------------------------------
// DYNAMIC SYLLABUS MOB TEST GENERATOR
// Creates 3 high-impact syllabus questions per mob based on active subject & class
// ----------------------------------------------------------------------------
export const getMobSyllabusTest = (
  mob: BiomeMob,
  className: string = 'Class 7',
  subjectName: string = 'Mathematics'
): MobQuestion[] => {
  const normSubject = subjectName.toLowerCase();
  const mobId = mob.id;

  // --------------------------------------------------------------------------
  // 1. MATHEMATICS CURRICULUM TESTS
  // --------------------------------------------------------------------------
  if (normSubject.includes('math')) {
    // --- PLAINS MOBS (Math Chapters 1 - 3: Integers, Signs, Fractions) ---
    if (mobId === 'mob-plains-zombie') {
      return [
        {
          id: 'q-pz-1',
          chapter: 'Chapter 1: Integers & Number Lines',
          conceptTitle: 'Negative Integer Addition',
          question: 'What is (-8) + (-9) on the integer number line?',
          options: ['-17', '+17', '-1', '+1'],
          correctOptionIndex: 0,
          explanation: 'Adding two negative values moves further left on the line: (-8) + (-9) = -17.',
          mobReactionCorrect: 'Hrrgh! You got it right! My decaying arm felt that!',
          mobReactionWrong: 'Urrgh! Adding negatives makes it more negative, not positive!',
        },
        {
          id: 'q-pz-2',
          chapter: 'Chapter 1: Additive Inverses',
          conceptTitle: 'Additive Inverse Property',
          question: 'What is the additive inverse of -15?',
          options: ['+15', '-15', '0', '1/15'],
          correctOptionIndex: 0,
          explanation: 'The additive inverse of a number x is -x such that x + (-x) = 0. So -(-15) = +15.',
          mobReactionCorrect: 'Good! The signs flipped right into my face!',
          mobReactionWrong: 'Wrong! The additive inverse cancels the number to zero!',
        },
        {
          id: 'q-pz-3',
          chapter: 'Chapter 1: Integer Subtraction',
          conceptTitle: 'Subtracting a Negative',
          question: 'Evaluate: 12 - (-7)',
          options: ['19', '5', '-19', '-5'],
          correctOptionIndex: 0,
          explanation: 'Subtracting a negative is equivalent to adding: 12 - (-7) = 12 + 7 = 19.',
          mobReactionCorrect: 'Ouch! Minus of minus became plus!',
          mobReactionWrong: 'Be careful! Two minuses together turn into a positive!',
        },
      ];
    }

    if (mobId === 'mob-plains-creeper') {
      return [
        {
          id: 'q-pc-1',
          chapter: 'Chapter 1: Rule of Signs',
          conceptTitle: 'Integer Multiplication',
          question: 'Calculate quickly: (-5) × (-6) × (-2)',
          options: ['-60', '+60', '-30', '+30'],
          correctOptionIndex: 0,
          explanation: '(-5) × (-6) = +30; then (+30) × (-2) = -60. Three negative signs result in negative.',
          mobReactionCorrect: 'Hisss! Fuse paused! You counted the odd number of negatives!',
          mobReactionWrong: 'Tick-tick! Odd number of negative signs makes the product negative!',
        },
        {
          id: 'q-pc-2',
          chapter: 'Chapter 2: Fractions Conversion',
          conceptTitle: 'Improper to Mixed Fraction',
          question: 'Convert the improper fraction 23/4 into a mixed number:',
          options: ['5 3/4', '4 3/4', '5 1/4', '6 1/4'],
          correctOptionIndex: 0,
          explanation: '23 ÷ 4 = 5 quotient with remainder 3, which is 5 3/4.',
          mobReactionCorrect: 'Sssss... Precise division! My fuse is getting shorter!',
          mobReactionWrong: 'Hisss! 4 × 5 = 20 + 3 = 23, so the answer is 5 3/4!',
        },
        {
          id: 'q-pc-3',
          chapter: 'Chapter 2: Fractions Comparison',
          conceptTitle: 'Cross-Multiplication of Fractions',
          question: 'Which fraction is larger: 3/4 or 5/7?',
          options: ['3/4 is larger', '5/7 is larger', 'They are equal', 'Cannot determine'],
          correctOptionIndex: 0,
          explanation: 'Cross-multiply: 3 × 7 = 21, and 4 × 5 = 20. Since 21 > 20, 3/4 > 5/7.',
          mobReactionCorrect: 'BOOM... of joy! You cross-multiplied like a pro!',
          mobReactionWrong: 'Almost exploded! Compare 21/28 vs 20/28, so 3/4 is larger!',
        },
      ];
    }

    if (mobId === 'mob-plains-irongolem') {
      return [
        {
          id: 'q-pi-1',
          chapter: 'Chapter 2: Fraction Multiplication',
          conceptTitle: 'Fraction of a Quantity',
          question: 'Find 3/5 of 45 kg of iron ore:',
          options: ['27 kg', '25 kg', '30 kg', '18 kg'],
          correctOptionIndex: 0,
          explanation: '(3/5) × 45 = 3 × (45/5) = 3 × 9 = 27 kg.',
          mobReactionCorrect: 'Hrmph! Solid math! That is enough iron for 3 helmets!',
          mobReactionWrong: 'Clang! Divide 45 by 5 to get 9, then multiply by 3 to get 27!',
        },
        {
          id: 'q-pi-2',
          chapter: 'Chapter 1: Properties of Integers',
          conceptTitle: 'Distributive Property',
          question: 'What is 18 × (-12) + 18 × (+2)?',
          options: ['-180', '-18', '+180', '-216'],
          correctOptionIndex: 0,
          explanation: 'By distributive law: 18 × [(-12) + 2] = 18 × (-10) = -180.',
          mobReactionCorrect: 'Impressive usage of the distributive law!',
          mobReactionWrong: 'Factor out 18: 18 × (-12 + 2) = 18 × (-10) = -180!',
        },
        {
          id: 'q-pi-3',
          chapter: 'Chapter 2: Reciprocal Foundations',
          conceptTitle: 'Reciprocal of Mixed Fractions',
          question: 'What is the reciprocal of the mixed fraction 2 1/3?',
          options: ['3/7', '7/3', '3/2', '2/3'],
          correctOptionIndex: 0,
          explanation: '2 1/3 = 7/3. The reciprocal flips numerator and denominator to 3/7.',
          mobReactionCorrect: 'Hrmph! You have proven your Overworld arithmetic mastery!',
          mobReactionWrong: 'Convert 2 1/3 to 7/3 first, then invert it to 3/7!',
        },
      ];
    }

    // --- OCEAN MOBS (Math Chapters 4 - 6: Division of Fractions, Decimals, Rationals) ---
    if (mobId === 'mob-ocean-pufferfish') {
      return [
        {
          id: 'q-op-1',
          chapter: 'Chapter 2: Decimals Multiplication',
          conceptTitle: 'Decimal Point Placement',
          question: 'Evaluate: 0.04 × 0.2',
          options: ['0.008', '0.08', '0.8', '0.0008'],
          correctOptionIndex: 0,
          explanation: '4 × 2 = 8. There are 2 + 1 = 3 decimal places, so 0.008.',
          mobReactionCorrect: '*Puff deflates* Perfect count of decimal places!',
          mobReactionWrong: '*Puffs up!* Count all decimal places: two in 0.04 and one in 0.2 equals three!',
        },
        {
          id: 'q-op-2',
          chapter: 'Chapter 2: Decimals Division by 10/100',
          conceptTitle: 'Shifting Decimal Points',
          question: 'What is 47.8 ÷ 100?',
          options: ['0.478', '4.78', '478', '0.0478'],
          correctOptionIndex: 0,
          explanation: 'Dividing by 100 shifts the decimal point 2 positions to the left: 0.478.',
          mobReactionCorrect: 'Smooth shift! You swam through that decimal without touching the spikes!',
          mobReactionWrong: 'Spikes out! Shift left by two places when dividing by 100!',
        },
        {
          id: 'q-op-3',
          chapter: 'Chapter 2: Metric Units & Decimals',
          conceptTitle: 'Centimeters to Meters',
          question: 'Express 75 cm in meters:',
          options: ['0.75 m', '7.5 m', '0.075 m', '750 m'],
          correctOptionIndex: 0,
          explanation: '1 m = 100 cm, so 75 cm = 75/100 = 0.75 m.',
          mobReactionCorrect: 'Spot on! You measure oceanic depths accurately!',
          mobReactionWrong: '1 meter is 100 cm, so divide 75 by 100 to get 0.75 m!',
        },
      ];
    }

    if (mobId === 'mob-ocean-drowned') {
      return [
        {
          id: 'q-od-1',
          chapter: 'Chapter 2: Fractions Division',
          conceptTitle: 'Reciprocal of Divisor',
          question: 'What is (4/7) ÷ (8/21)?',
          options: ['3/2 (or 1 1/2)', '2/3', '32/147', '1/2'],
          correctOptionIndex: 0,
          explanation: '(4/7) × (21/8) = (4/8) × (21/7) = (1/2) × 3 = 3/2.',
          mobReactionCorrect: 'Gurgle! Trident blocked! You inverted the second fraction!',
          mobReactionWrong: 'Gurgle! Multiply by the reciprocal (21/8), not (8/21)!',
        },
        {
          id: 'q-od-2',
          chapter: 'Chapter 9: Rational Numbers',
          conceptTitle: 'Equivalent Rational Numbers',
          question: 'Which of the following is equivalent to -3/5?',
          options: ['-12/20', '12/20', '-9/10', '-6/15'],
          correctOptionIndex: 0,
          explanation: 'Multiply numerator and denominator by 4: (-3 × 4)/(5 × 4) = -12/20.',
          mobReactionCorrect: 'The currents agree! Equivalent fraction found!',
          mobReactionWrong: 'Multiply top and bottom by the same number: -3 × 4 = -12, 5 × 4 = 20!',
        },
        {
          id: 'q-od-3',
          chapter: 'Chapter 9: Rational Number Operations',
          conceptTitle: 'Standard Form of Rational Numbers',
          question: 'Reduce -36/84 to its standard lowest form:',
          options: ['-3/7', '-9/21', '-6/14', '-4/7'],
          correctOptionIndex: 0,
          explanation: 'Divide both by greatest common divisor 12: -36 ÷ 12 = -3, 84 ÷ 12 = 7 => -3/7.',
          mobReactionCorrect: 'Trident lowered! That was the cleanest reduction I have seen!',
          mobReactionWrong: 'Divide numerator and denominator by their GCD 12!',
        },
      ];
    }

    if (mobId === 'mob-ocean-elderguardian') {
      return [
        {
          id: 'q-oe-1',
          chapter: 'Chapter 9: Rational Numbers between Two Fractions',
          conceptTitle: 'Finding In-between Rational Numbers',
          question: 'What is a rational number strictly between 1/3 and 1/2?',
          options: ['5/12', '1/5', '3/4', '7/12'],
          correctOptionIndex: 0,
          explanation: '1/3 = 4/12 and 1/2 = 6/12. Exactly between them is 5/12.',
          mobReactionCorrect: 'BZZZT! Laser reflected! 5/12 sits right in the monument channel!',
          mobReactionWrong: 'BZZZT! Common denominator of 12 gives 4/12 and 6/12; 5/12 is between!',
        },
        {
          id: 'q-oe-2',
          chapter: 'Chapter 9: Rational Negative Depths',
          conceptTitle: 'Comparing Negative Rationals',
          question: 'Which is deeper (smaller value): -4/5 or -2/3?',
          options: ['-4/5 is smaller', '-2/3 is smaller', 'Both are equal', 'Cannot compare'],
          correctOptionIndex: 0,
          explanation: '-4/5 = -0.80 and -2/3 = -0.666... On the number line, -0.80 lies further left (is smaller).',
          mobReactionCorrect: 'Eye flashes with respect! Deeper into the negative abyss!',
          mobReactionWrong: 'On the negative side, larger absolute magnitude means smaller overall value!',
        },
        {
          id: 'q-oe-3',
          chapter: 'Chapter 2: Rational Word Problem',
          conceptTitle: 'Sea Level Elevation Delta',
          question: 'A submarine was at -320 m. It descended another 150 m, then rose 200 m. Final position?',
          options: ['-270 m', '-370 m', '-670 m', '+30 m'],
          correctOptionIndex: 0,
          explanation: '-320 - 150 + 200 = -470 + 200 = -270 m.',
          mobReactionCorrect: 'MONUMENT CONQUERED! You have mastered the entire oceanic stage!',
          mobReactionWrong: 'Trace step-by-step: -320 - 150 = -470; then -470 + 200 = -270 m!',
        },
      ];
    }

    // --- NETHER MOBS (Math Chapters 4, 5, 6: Simple Equations, Lines & Angles, Triangles) ---
    if (mobId === 'mob-nether-blaze') {
      return [
        {
          id: 'q-nb-1',
          chapter: 'Chapter 4: Simple Equations',
          conceptTitle: 'Linear Equation Transposition',
          question: 'Solve for x: 4x - 9 = 27',
          options: ['x = 9', 'x = 8', 'x = 6', 'x = 7'],
          correctOptionIndex: 0,
          explanation: '4x = 27 + 9 => 4x = 36 => x = 9.',
          mobReactionCorrect: 'Fwoosh! Fire extinguished! 4 × 9 - 9 = 27 checks out!',
          mobReactionWrong: 'Add 9 to both sides first: 4x = 36, so x = 36/4 = 9!',
        },
        {
          id: 'q-nb-2',
          chapter: 'Chapter 4: Fractional Coefficients',
          conceptTitle: 'Solving Fractional Linear Equations',
          question: 'Solve for y: (y / 3) + 5 = 11',
          options: ['y = 18', 'y = 12', 'y = 24', 'y = 6'],
          correctOptionIndex: 0,
          explanation: 'y/3 = 11 - 5 => y/3 = 6 => y = 6 × 3 = 18.',
          mobReactionCorrect: 'Blaze rods spinning in defeat! y = 18 balanced the scale!',
          mobReactionWrong: 'Subtract 5 first to get y/3 = 6, then multiply by 3 to get 18!',
        },
        {
          id: 'q-nb-3',
          chapter: 'Chapter 4: Equation Word Problems',
          conceptTitle: 'Translating Words to Equations',
          question: '“Three times a number added to 8 gives 32.” What is the number?',
          options: ['8', '10', '6', '12'],
          correctOptionIndex: 0,
          explanation: '3n + 8 = 32 => 3n = 24 => n = 8.',
          mobReactionCorrect: 'Pyromancer humbled! The equation was translated seamlessly!',
          mobReactionWrong: '3n + 8 = 32 implies 3n = 24, giving n = 8!',
        },
      ];
    }

    if (mobId === 'mob-nether-piglin') {
      return [
        {
          id: 'q-np-1',
          chapter: 'Chapter 5: Lines & Angles',
          conceptTitle: 'Supplementary Angles',
          question: 'If two angles are supplementary and one is 65°, what is the other angle?',
          options: ['115°', '25°', '125°', '35°'],
          correctOptionIndex: 0,
          explanation: 'Supplementary angles sum to 180°. 180° - 65° = 115°.',
          mobReactionCorrect: 'Oink! A fair angle barter! 115° + 65° = 180°!',
          mobReactionWrong: 'Snort! Supplementary means adding to 180°, not 90° (complementary)!',
        },
        {
          id: 'q-np-2',
          chapter: 'Chapter 5: Transversal Crossroads',
          conceptTitle: 'Vertically Opposite Angles',
          question: 'When two straight lines intersect, vertically opposite angles are:',
          options: ['Always Equal', 'Supplementary', 'Complementary', 'Unequal'],
          correctOptionIndex: 0,
          explanation: 'Vertically opposite angles formed by intersecting lines are always equal.',
          mobReactionCorrect: 'Gold quality answer! Vertically opposite angles match exactly!',
          mobReactionWrong: 'Intersecting straight lines always create identical opposite angle pairs!',
        },
        {
          id: 'q-np-3',
          chapter: 'Chapter 5: Parallel Lines & Transversal',
          conceptTitle: 'Interior Angles on the Same Side',
          question: 'Interior angles on the same side of a transversal cutting parallel lines are:',
          options: ['Supplementary (180°)', 'Equal', 'Complementary (90°)', 'Always 60°'],
          correctOptionIndex: 0,
          explanation: 'Consecutive interior angles on the same side sum to 180° (are supplementary).',
          mobReactionCorrect: 'Bastion vault opens! Take the gold, master of angles!',
          mobReactionWrong: 'Consecutive interior angles on the same side add up to 180°!',
        },
      ];
    }

    if (mobId === 'mob-nether-ghast') {
      return [
        {
          id: 'q-ng-1',
          chapter: 'Chapter 6: Triangle Properties',
          conceptTitle: 'Exterior Angle Theorem',
          question: 'An exterior angle of a triangle is 110°. One interior opposite angle is 40°. What is the other?',
          options: ['70°', '60°', '80°', '50°'],
          correctOptionIndex: 0,
          explanation: 'Exterior angle = Sum of interior opposite angles. 110° = 40° + x => x = 70°.',
          mobReactionCorrect: 'Waaaah! Fireball deflected right back by the exterior angle rule!',
          mobReactionWrong: 'Exterior angle equals sum of interior opposites: 110° - 40° = 70°!',
        },
        {
          id: 'q-ng-2',
          chapter: 'Chapter 6: Triangle Inequality',
          conceptTitle: 'Triangle Inequality Theorem',
          question: 'Which of the following sets of side lengths CAN form a valid triangle?',
          options: ['4 cm, 5 cm, 7 cm', '2 cm, 3 cm, 6 cm', '1 cm, 2 cm, 3 cm', '5 cm, 5 cm, 12 cm'],
          correctOptionIndex: 0,
          explanation: 'Sum of any two sides must exceed the third side: 4 + 5 = 9 > 7.',
          mobReactionCorrect: 'Valid sides! The triangular shield holds firm in the air!',
          mobReactionWrong: 'For any triangle, the sum of the two shorter sides must be strictly greater than the third!',
        },
        {
          id: 'q-ng-3',
          chapter: 'Chapter 6: Pythagoras Property',
          conceptTitle: 'Right-Angled Triangle Hypotenuse',
          question: 'In a right-angled triangle with legs of length 6 cm and 8 cm, the hypotenuse is:',
          options: ['10 cm', '12 cm', '14 cm', '9 cm'],
          correctOptionIndex: 0,
          explanation: 'Hypotenuse² = 6² + 8² = 36 + 64 = 100. √100 = 10 cm.',
          mobReactionCorrect: 'GHAST DEFEATED! The Pythagorean strike was true and pure!',
          mobReactionWrong: '6² + 8² = 36 + 64 = 100, and √100 = 10 cm!',
        },
      ];
    }

    // --- THE END MOBS (Math Chapters 8, 11, 12: Ratios, Perimeter, Area, Capstone) ---
    if (mobId === 'mob-end-shulker') {
      return [
        {
          id: 'q-es-1',
          chapter: 'Chapter 11: Perimeter and Area',
          conceptTitle: 'Circumference of a Circle',
          question: 'What is the circumference of a circular portal of radius 14 cm? (use π = 22/7)',
          options: ['88 cm', '44 cm', '176 cm', '616 cm'],
          correctOptionIndex: 0,
          explanation: 'C = 2 × π × r = 2 × (22/7) × 14 = 2 × 22 × 2 = 88 cm.',
          mobReactionCorrect: 'Clack! Shell defeated! 2πr calculated without levitating!',
          mobReactionWrong: 'C = 2 × (22/7) × 14 = 88 cm. Do not forget the factor of 2!',
        },
        {
          id: 'q-es-2',
          chapter: 'Chapter 11: Area of a Circle',
          conceptTitle: 'Circle Area Formula (πr²)',
          question: 'What is the area of a circle with radius 7 cm? (use π = 22/7)',
          options: ['154 cm²', '44 cm²', '88 cm²', '308 cm²'],
          correctOptionIndex: 0,
          explanation: 'Area = π × r² = (22/7) × 7 × 7 = 22 × 7 = 154 cm².',
          mobReactionCorrect: 'Exact square centimeters! The levitation bullet dissolved!',
          mobReactionWrong: 'Area = (22/7) × 7² = 22 × 7 = 154 cm²!',
        },
        {
          id: 'q-es-3',
          chapter: 'Chapter 11: Area of a Triangle',
          conceptTitle: 'Base and Height Area',
          question: 'A triangular End island has base 16 m and height 9 m. What is its area?',
          options: ['72 m²', '144 m²', '80 m²', '36 m²'],
          correctOptionIndex: 0,
          explanation: 'Area = 1/2 × base × height = 1/2 × 16 × 9 = 8 × 9 = 72 m².',
          mobReactionCorrect: 'Shulker box opened! 1/2 × b × h executed cleanly!',
          mobReactionWrong: 'Divide base × height by 2: (16 × 9) / 2 = 72 m²!',
        },
      ];
    }

    if (mobId === 'mob-end-enderman') {
      return [
        {
          id: 'q-ee-1',
          chapter: 'Chapter 8: Comparing Quantities',
          conceptTitle: 'Ratio to Percentage',
          question: 'Convert the ratio 3 : 5 into a percentage:',
          options: ['60%', '35%', '75%', '50%'],
          correctOptionIndex: 0,
          explanation: '(3 / 5) × 100% = 3 × 20% = 60%.',
          mobReactionCorrect: 'Vwoop... Correct percentage! You did not blink!',
          mobReactionWrong: 'Vwoop! 3/5 = 0.60, which equals 60%!',
        },
        {
          id: 'q-ee-2',
          chapter: 'Chapter 8: Profit and Loss',
          conceptTitle: 'Percentage Profit Calculation',
          question: 'An item bought for ₹400 is sold for ₹480. What is the profit percentage?',
          options: ['20%', '25%', '15%', '18%'],
          correctOptionIndex: 0,
          explanation: 'Profit = ₹480 - ₹400 = ₹80. Profit % = (80 / 400) × 100 = 20%.',
          mobReactionCorrect: 'Vwoop! Exact gain percentage calculated!',
          mobReactionWrong: 'Profit is ₹80. (80 / 400) × 100 = 20%!',
        },
        {
          id: 'q-ee-3',
          chapter: 'Chapter 8: Simple Interest Formula',
          conceptTitle: 'SI = (P × R × T) / 100',
          question: 'Calculate simple interest on ₹2000 at 5% per annum for 3 years:',
          options: ['₹300', '₹350', '₹250', '₹150'],
          correctOptionIndex: 0,
          explanation: 'SI = (P × R × T) / 100 = (2000 × 5 × 3) / 100 = 20 × 15 = ₹300.',
          mobReactionCorrect: 'Enderman bows! The interest was calculated without flaw!',
          mobReactionWrong: 'Use SI = (P × R × T) / 100: (2000 × 15) / 100 = ₹300!',
        },
      ];
    }

    if (mobId === 'mob-end-enderdragon') {
      return [
        {
          id: 'q-ed-1',
          chapter: 'Chapter 4: Linear Equations Mastery',
          conceptTitle: 'Multi-Step Equation',
          question: 'Grand Boss Challenge 1: Solve for x: 5(x - 3) = 3x + 9',
          options: ['x = 12', 'x = 10', 'x = 8', 'x = 6'],
          correctOptionIndex: 0,
          explanation: '5x - 15 = 3x + 9 => 2x = 24 => x = 12.',
          mobReactionCorrect: 'DRAGON ROARS IN PAIN! The algebraic shield shattered!',
          mobReactionWrong: 'Expand: 5x - 15 = 3x + 9 => 2x = 24 => x = 12!',
        },
        {
          id: 'q-ed-2',
          chapter: 'Chapter 11: Perimeter & Area Synthesis',
          conceptTitle: 'Combined Area',
          question: 'Grand Boss Challenge 2: A square park has perimeter 80 m. What is its area?',
          options: ['400 m²', '200 m²', '640 m²', '160 m²'],
          correctOptionIndex: 0,
          explanation: 'Side = 80 / 4 = 20 m. Area = side × side = 20 × 20 = 400 m².',
          mobReactionCorrect: 'A direct hit to the Dragon Heart Spire!',
          mobReactionWrong: 'Side = 80 ÷ 4 = 20 m. Area is 20 × 20 = 400 m²!',
        },
        {
          id: 'q-ed-3',
          chapter: 'Chapter 8 & 12: Comprehensive Capstone',
          conceptTitle: 'The Ultimate Syllabus Equation',
          question: 'Grand Mastery Exam: If 40% of a number is 120, what is 60% of that same number?',
          options: ['180', '160', '150', '200'],
          correctOptionIndex: 0,
          explanation: '0.40 × n = 120 => n = 300. Then 60% of 300 = 0.60 × 300 = 180.',
          mobReactionCorrect: 'THE ENDER DRAGON COLLAPSES IN RADIANT PURPLE LIGHT! YOU ARE A CERTIFIED MATH MASTER!',
          mobReactionWrong: 'The number is 120 / 0.4 = 300. 60% of 300 is 180!',
        },
      ];
    }
  }

  // --------------------------------------------------------------------------
  // 2. SCIENCE CURRICULUM TESTS (Fallback/Adaptive when Science is selected)
  // --------------------------------------------------------------------------
  if (normSubject.includes('sci') || normSubject.includes('phys') || normSubject.includes('chem') || normSubject.includes('bio')) {
    if (mob.biome === 'plains') {
      return [
        {
          id: 'q-sci-p-1',
          chapter: 'Chapter 1: Plant Nutrition',
          conceptTitle: 'Photosynthesis Pigment',
          question: 'Which green pigment in leaves captures sunlight for photosynthesis?',
          options: ['Chlorophyll', 'Hemoglobin', 'Melanin', 'Carotene'],
          correctOptionIndex: 0,
          explanation: 'Chlorophyll traps light energy to synthesize glucose from water and CO₂.',
          mobReactionCorrect: 'Chlorophyll energy absorbed! Spot on!',
          mobReactionWrong: 'Chlorophyll is the green pigment responsible for photosynthesis!',
        },
        {
          id: 'q-sci-p-2',
          chapter: 'Chapter 2: Animal Nutrition',
          conceptTitle: 'Liver and Bile',
          question: 'Which organ produces bile juice to assist in fat digestion?',
          options: ['Liver', 'Pancreas', 'Stomach', 'Kidney'],
          correctOptionIndex: 0,
          explanation: 'The liver secretes bile juice, stored in the gall bladder.',
          mobReactionCorrect: 'Right! The liver emulsifies fats in the digestive canal!',
          mobReactionWrong: 'The liver produces bile juice!',
        },
        {
          id: 'q-sci-p-3',
          chapter: 'Chapter 4: Heat Transfer',
          conceptTitle: 'Modes of Heat Transfer',
          question: 'Heat reaches Earth from the Sun through empty space primarily via:',
          options: ['Radiation', 'Conduction', 'Convection', 'Refraction'],
          correctOptionIndex: 0,
          explanation: 'Radiation requires no medium and travels through empty space.',
          mobReactionCorrect: 'Thermal radiation mastered!',
          mobReactionWrong: 'Radiation is the only mode of heat transfer that works in a vacuum!',
        },
      ];
    }

    if (mob.biome === 'ocean') {
      return [
        {
          id: 'q-sci-o-1',
          chapter: 'Chapter 5: Acids, Bases and Salts',
          conceptTitle: 'Litmus Paper Indicator',
          question: 'What color does blue litmus paper turn when exposed to an acidic solution?',
          options: ['Red', 'Blue', 'Green', 'Yellow'],
          correctOptionIndex: 0,
          explanation: 'Acids turn blue litmus red. Bases turn red litmus blue.',
          mobReactionCorrect: 'Acid test passed! Blue to red!',
          mobReactionWrong: 'Acids always turn blue litmus into red!',
        },
        {
          id: 'q-sci-o-2',
          chapter: 'Chapter 6: Physical & Chemical Changes',
          conceptTitle: 'Rusting of Iron',
          question: 'Rusting of iron requires the presence of both:',
          options: ['Oxygen and Water (Moisture)', 'Oxygen and Nitrogen', 'Hydrogen and Carbon', 'Sunlight and Heat'],
          correctOptionIndex: 0,
          explanation: 'Iron + Oxygen + Water -> Hydrated Iron Oxide (Rust).',
          mobReactionCorrect: 'Both oxygen and water are essential for rusting!',
          mobReactionWrong: 'Rusting strictly requires both oxygen and moisture!',
        },
        {
          id: 'q-sci-o-3',
          chapter: 'Chapter 10: Respiration in Organisms',
          conceptTitle: 'Aquatic Breathing',
          question: 'Which specialized respiratory organs allow fish to extract dissolved oxygen in water?',
          options: ['Gills', 'Lungs', 'Spiracles', 'Skin pores'],
          correctOptionIndex: 0,
          explanation: 'Gills are rich in blood vessels to extract dissolved oxygen from water.',
          mobReactionCorrect: 'Ocean breathing mechanics confirmed!',
          mobReactionWrong: 'Fish utilize gills to extract dissolved oxygen!',
        },
      ];
    }

    if (mob.biome === 'nether') {
      return [
        {
          id: 'q-sci-n-1',
          chapter: 'Chapter 13: Motion and Time',
          conceptTitle: 'Speed Formula',
          question: 'A vehicle covers 120 km in 2 hours. What is its average speed?',
          options: ['60 km/h', '240 km/h', '30 km/h', '50 km/h'],
          correctOptionIndex: 0,
          explanation: 'Speed = Distance / Time = 120 km / 2 h = 60 km/h.',
          mobReactionCorrect: 'Velocity calculated like a fiery fireball!',
          mobReactionWrong: 'Speed = Distance ÷ Time = 120 ÷ 2 = 60 km/h!',
        },
        {
          id: 'q-sci-n-2',
          chapter: 'Chapter 14: Electric Current and Effects',
          conceptTitle: 'Heating Effect of Current',
          question: 'Which metal alloy is commonly used as a heating element in electric heaters?',
          options: ['Nichrome', 'Copper', 'Aluminum', 'Lead'],
          correctOptionIndex: 0,
          explanation: 'Nichrome has high resistance and withstands high temperatures without oxidizing.',
          mobReactionCorrect: 'Nether fire tamer! Nichrome has high electrical resistance!',
          mobReactionWrong: 'Nichrome wire is the primary element used in heating coils!',
        },
        {
          id: 'q-sci-n-3',
          chapter: 'Chapter 14: Magnetic Effect',
          conceptTitle: 'Electromagnets',
          question: 'Who first discovered the magnetic effect of electric current using a compass needle?',
          options: ['Hans Christian Oersted', 'Isaac Newton', 'Thomas Edison', 'Alexander Bell'],
          correctOptionIndex: 0,
          explanation: 'Oersted discovered that current-carrying wires deflect magnetic needles in 1820.',
          mobReactionCorrect: 'Oersted discovery honored!',
          mobReactionWrong: 'Hans Christian Oersted discovered the magnetic deflection!',
        },
      ];
    }

    // End Biome Science
    return [
      {
        id: 'q-sci-e-1',
        chapter: 'Chapter 15: Light and Reflection',
        conceptTitle: 'Convex vs Concave Mirrors',
        question: 'Which type of mirror provides a wide field of view and is used as side rear-view mirrors in cars?',
        options: ['Convex Mirror', 'Concave Mirror', 'Plane Mirror', 'Cylindrical Mirror'],
        correctOptionIndex: 0,
        explanation: 'Convex mirrors always produce erect, diminished virtual images with a broad field of view.',
        mobReactionCorrect: 'Convex mirror reflection verified in the End realm!',
        mobReactionWrong: 'Convex mirrors give a wider field of view for drivers!',
      },
      {
        id: 'q-sci-e-2',
        chapter: 'Chapter 15: Dispersion of Light',
        conceptTitle: 'Prism Spectrum Colors',
        question: 'Splitting of white light into its seven constituent colors is called:',
        options: ['Dispersion', 'Reflection', 'Absorption', 'Diffraction'],
        correctOptionIndex: 0,
        explanation: 'Dispersion splits white light into VIBGYOR through a triangular prism.',
        mobReactionCorrect: 'Spectrum unlocked in cosmic void!',
        mobReactionWrong: 'The splitting of light into 7 colors is termed Dispersion!',
      },
      {
        id: 'q-sci-e-3',
        chapter: 'Chapter 18: Wastewater & Environment',
        conceptTitle: 'Water Purification',
        question: 'Grand Science Capstone: Which disinfectant gas or chemical is added to clean drinking water?',
        options: ['Chlorine', 'Nitrogen', 'Helium', 'Carbon dioxide'],
        correctOptionIndex: 0,
        explanation: 'Chlorine (or ozone) disinfects water by eliminating pathogenic microorganisms.',
        mobReactionCorrect: 'THE ENDER DRAGON WITHERED! YOU HAVE COMPLETED SCIENCE CURRICULUM MASTERY!',
        mobReactionWrong: 'Chlorination is used globally to kill harmful bacteria in water!',
      },
    ];
  }

  // --------------------------------------------------------------------------
  // 3. GENERAL SYLLABUS / DEFAULT TESTS (English, Social, Computer, etc.)
  // --------------------------------------------------------------------------
  return [
    {
      id: `q-gen-${mob.id}-1`,
      chapter: `${mob.biome.toUpperCase()} Biome: Section 1`,
      conceptTitle: 'Core Subject Concepts',
      question: `Syllabus Check for ${className} ${subjectName}: Identify the statement that is fundamentally TRUE:`,
      options: [
        'Structured learning builds from foundational axioms to applied synthesis.',
        'Units of measurement can be ignored without affecting the final result.',
        'Variables remain strictly constant in dynamic problem solving.',
        'Practice without verification guarantees perfect mastery.',
      ],
      correctOptionIndex: 0,
      explanation: 'Curriculum standards mandate mastering core foundational principles before complex multi-step reasoning.',
      mobReactionCorrect: 'Solid reasoning! You understand core curriculum structure!',
      mobReactionWrong: 'Foundational concepts are essential for advanced problem solving!',
    },
    {
      id: `q-gen-${mob.id}-2`,
      chapter: `${mob.biome.toUpperCase()} Biome: Section 2`,
      conceptTitle: 'Analytical Thinking',
      question: `In ${subjectName}, when approaching a multi-step challenge, what is the best first step?`,
      options: [
        'Identify given variables, state targets, and outline formula relationships.',
        'Immediately guess the largest number among the options.',
        'Skip the question without reading the context.',
        'Assume all options are correct simultaneously.',
      ],
      correctOptionIndex: 0,
      explanation: 'Deconstructing given terms and target unknowns guarantees methodical accuracy.',
      mobReactionCorrect: 'Methodical approach confirmed!',
      mobReactionWrong: 'Always decompose given values before calculating!',
    },
    {
      id: `q-gen-${mob.id}-3`,
      chapter: `${mob.biome.toUpperCase()} Biome: Section 3`,
      conceptTitle: 'Synthesis & Review',
      question: `How can a student effectively ensure long-term retention of ${subjectName} topics?`,
      options: [
        'Active recall, gamified spaced practice, and explaining concepts to others.',
        'Cramming once before exams without revision.',
        'Only reading without solving problems.',
        'Ignoring mistakes made on previous tests.',
      ],
      correctOptionIndex: 0,
      explanation: 'Active recall and spaced retrieval strengthen neural connections in the syllabus.',
      mobReactionCorrect: `${mob.name} is defeated! Outstanding test performance!`,
      mobReactionWrong: 'Active recall and solving exercises form the bedrock of mastery!',
    },
  ];
};
