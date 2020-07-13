import { getConnection } from "typeorm";

import { Author } from "./database/entity/Author";
import { Book } from "./database/entity/Book";
import { BookCopy } from "./database/entity/BookCopy";
import { User } from "./database/entity/User";

function loadAuthors() {
  const { manager } = getConnection();

  return manager.insert(Author, [
    {
      name: "J. K. Rowling",
      bio: `Although she writes under the pen name J.K. Rowling, pronounced like rolling, her name when her first Harry Potter book was published was simply Joanne Rowling. Anticipating that the target audience of young boys might not want to read a book written by a woman, her publishers demanded that she use two initials, rather than her full name. As she had no middle name, she chose K as the second initial of her pen name, from her paternal grandmother Kathleen Ada Bulgen Rowling. She calls herself Jo and has said, "No one ever called me 'Joanne' when I was young, unless they were angry." Following her marriage, she has sometimes used the name Joanne Murray when conducting personal business. During the Leveson Inquiry she gave evidence under the name of Joanne Kathleen Rowling. In a 2012 interview, Rowling noted that she no longer cared that people pronounced her name incorrectly.

      Rowling was born to Peter James Rowling, a Rolls-Royce aircraft engineer, and Anne Rowling (née Volant), on 31 July 1965 in Yate, Gloucestershire, England, 10 miles (16 km) northeast of Bristol. Her mother Anne was half-French and half-Scottish. Her parents first met on a train departing from King's Cross Station bound for Arbroath in 1964. They married on 14 March 1965. Her mother's maternal grandfather, Dugald Campbell, was born in Lamlash on the Isle of Arran. Her mother's paternal grandfather, Louis Volant, was awarded the Croix de Guerre for exceptional bravery in defending the village of Courcelles-le-Comte during the First World War.
      
      Rowling's sister Dianne was born at their home when Rowling was 23 months old. The family moved to the nearby village Winterbourne when Rowling was four. She attended St Michael's Primary School, a school founded by abolitionist William Wilberforce and education reformer Hannah More. Her headmaster at St Michael's, Alfred Dunn, has been suggested as the inspiration for the Harry Potter headmaster Albus Dumbledore.
      
      As a child, Rowling often wrote fantasy stories, which she would usually then read to her sister. She recalls that: "I can still remember me telling her a story in which she fell down a rabbit hole and was fed strawberries by the rabbit family inside it. Certainly the first story I ever wrote down (when I was five or six) was about a rabbit called Rabbit. He got the measles and was visited by his friends, including a giant bee called Miss Bee." At the age of nine, Rowling moved to Church Cottage in the Gloucestershire village of Tutshill, close to Chepstow, Wales. When she was a young teenager, her great aunt, who Rowling said "taught classics and approved of a thirst for knowledge, even of a questionable kind," gave her a very old copy of Jessica Mitford's autobiography, Hons and Rebels. Mitford became Rowling's heroine, and Rowling subsequently read all of her books.
      
      Rowling has said of her teenage years, in an interview with The New Yorker, "I wasn’t particularly happy. I think it’s a dreadful time of life." She had a difficult homelife; her mother was ill and she had a difficult relationship with her father (she is no longer on speaking terms with him). She attended secondary school at Wyedean School and College, where her mother had worked as a technician in the science department. Rowling said of her adolescence, "Hermione [a bookish, know-it-all Harry Potter character] is loosely based on me. She's a caricature of me when I was eleven, which I'm not particularly proud of." Steve Eddy, who taught Rowling English when she first arrived, remembers her as "not exceptional" but "one of a group of girls who were bright, and quite good at English." Sean Harris, her best friend in the Upper Sixth owned a turquoise Ford Anglia, which she says inspired the one in her books.`,
      photoPath: "/images/book-authors/j-k-rowling.jpg"
    },
    {
      name: "James S. A. Corey",
      bio: `Under the pen name James S. A. Corey, fantasy author Daniel Abraham began to collaborate with Ty Franck (who had worked as a personal assistant to George R. R. Martin) in 2011. Together they wrote Leviathan Wakes (2011), the first science fiction novel in the series The Expanse. Leviathan Wakes was nominated for the 2012 Hugo Award for Best Novel and the 2012 Locus Award for Best Science Fiction Novel. The authors began to release other novels in the series including Caliban's War (2012), Abaddon's Gate (2013), Cibola Burn (2014), Nemesis Games (2015), Babylon's Ashes (2016), and Persepolis Rising (2017). Abaddon's Gate won the Locus Award. Orbit Books signed the authors to write additional books in the Expanse series to bring the total to nine. The eighth and latest book in the series, Tiamat's Wrath, was released on March 26, 2019.

      Between each pair of full-length books, they published shorter works in the series. The first, a short story entitled The Butcher of Anderson Station: A Story of The Expanse was released as an eBook in October 2011. A 69-page novella, Gods of Risk followed, and was released as an eBook on September 2012. A short story entitled Drive was released in November 2012 as a part of the anthology Edge of Infinity. Another novella, The Churn, was released April 29, 2014, and other novellas have followed. All are set in The Expanse series.
      
      The authors have also written a Star Wars novel, Honor Among Thieves, published by Random House in 2014, and a short story unrelated to The Expanse titled A Man Without Honor, included in the anthology Old Mars, edited by George R. R. Martin.`,
      photoPath: "/images/book-authors/james-s-a-corey.jpg"
    },
    {
      name: "Andrzej Sapkowski",
      bio: `Andrzej Sapkowski, born June 21, 1948 in Łódź, is a Polish fantasy writer. Sapkowski studied economics, and before turning to writing, he had worked as a senior sales representative for a foreign trade company. His first short story, The Witcher (Wiedźmin), was published in Fantastyka, Poland's leading fantasy literary magazine, in 1986 and was enormously successful both with readers and critics. Sapkowski has created a cycle of tales based on the world of The Witcher, comprising three collections of short stories and five novels. This cycle and his many other works have made him one of the best-known fantasy authors in Poland in the 1990s.

      The main character of The Witcher (alternative translation: The Hexer) is Geralt, a mutant assassin who has been trained since childhood to hunt down and destroy monsters. Geralt exists in an ambiguous moral universe, yet manages to maintain his own coherent code of ethics. At the same time cynical and noble, Geralt has been compared to Raymond Chandler's signature character Philip Marlowe. The world in which these adventures take place is heavily influenced by Slavic mythology.
      
      Sapkowski has won five Zajdel Awards, including three for short stories "Mniejsze zło" (Lesser Evil) (1990), "Miecz przeznaczenia" (Sword of Destiny) (1992) and "W leju po bombie" (In a Bomb Crater) (1993), and two for the novels "Krew elfów" (Blood of Elves) (1994) and "Narrenturm" (2002). He also won the Spanish Ignotus Award, best anthology, for The Last Wish in 2003, and for "Muzykanci" (The Musicians), best foreign short story, same year.
      
      In 1997, Sapkowski won the prestigious Polityka's Passport award, which is awarded annually to artists who have strong prospects for international success.
      
      In 2001, a Television Series based on the Witcher cycle was released in Poland and internationally, entitled Wiedźmin (The Hexer). A film by the same title was compiled from excerpts of the television series but both have been critical and box office failures.
      
      Sapkowski's books have been translated into Czech, Russian, Lithuanian, German, Spanish, French, Ukrainian, and Portuguese. An English translation of The Last Wish short story collection was published by Gollancz in 2007.
      
      The Polish game publisher, CD Projekt, created a role-playing PC game based on this universe, called The Witcher, which was released in October 2007. There is also a mobile version of the game which has been created by Breakpoint Games and is being published by Hands-On Mobile in Western Europe,Latin America and Asia Pacific.
      
      The English translation of Sapkowski's novel Blood of Elves won the David Gemmell Legends Award in 2009.`,
      photoPath: "/images/book-authors/andrzej-sapkowski.jpg"
    }
  ]);
}

async function loadBooks() {
  const { manager } = getConnection();

  let author = await manager.findOneOrFail(Author, { name: "J. K. Rowling" });
  await manager.insert(Book, [
    {
      authorId: author.id,
      title: "Harry Potter and the Sorcerer's Stone",
      description: `Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes when he receives a letter that tells him the truth about himself: he's a wizard. A mysterious visitor rescues him from his relatives and takes him to his new home, Hogwarts School of Witchcraft and Wizardry.

      After a lifetime of bottling up his magical powers, Harry finally feels like a normal kid. But even within the Wizarding community, he is special. He is the boy who lived: the only person to have ever survived a killing curse inflicted by the evil Lord Voldemort, who launched a brutal takeover of the Wizarding world, only to vanish after failing to kill Harry.
      
      Though Harry's first year at Hogwarts is the best of his life, not everything is perfect. There is a dangerous secret object hidden within the castle walls, and Harry believes it's his responsibility to prevent it from falling into evil hands. But doing so will bring him into contact with forces more terrifying than he ever could have imagined.
      
      Full of sympathetic characters, wildly imaginative situations, and countless exciting details, the first installment in the series assembles an unforgettable magical world and sets the stage for many high-stakes adventures to come.`,
      coverPath: "/images/book-covers/harry1.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Chamber of Secrets",
      description: `The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike

      And strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockhart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny.
      
      But each of these seem minor annoyances when the real trouble begins, and someone -- or something -- starts turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possibly be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects . . . Harry Potter himself?`,
      coverPath: "/images/book-covers/harry2.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Prisoner of Azkaban",
      description: `Harry Potter's third year at Hogwarts is full of new dangers. A convicted murderer, Sirius Black, has broken out of Azkaban prison, and it seems he's after Harry. Now Hogwarts is being patrolled by the dementors, the Azkaban guards who are hunting Sirius. But Harry can't imagine that Sirius or, for that matter, the evil Lord Voldemort could be more frightening than the dementors themselves, who have the terrible power to fill anyone they come across with aching loneliness and despair. Meanwhile, life continues as usual at Hogwarts. A top-of-the-line broom takes Harry's success at Quidditch, the sport of the Wizarding world, to new heights. A cute fourth-year student catches his eye. And he becomes close with the new Defense of the Dark Arts teacher, who was a childhood friend of his father. Yet despite the relative safety of life at Hogwarts and the best efforts of the dementors, the threat of Sirius Black grows ever closer. But if Harry has learned anything from his education in wizardry, it is that things are often not what they seem. Tragic revelations, heartwarming surprises, and high-stakes magical adventures await the boy wizard in this funny and poignant third installment of the beloved series.`,
      coverPath: "/images/book-covers/harry3.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Goblet of Fire",
      description: `Harry Potter is midway through his training as a wizard and his coming of age. Harry wants to get away from the pernicious Dursleys and go to the International Quidditch Cup. He wants to find out about the mysterious event that's supposed to take place at Hogwarts this year, an event involving two other rival schools of magic, and a competition that hasn't happened for a hundred years. He wants to be a normal, fourteen-year-old wizard. But unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in his case, different can be deadly.`,
      coverPath: "/images/book-covers/harry4.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Order of the Phoenix",
      coverPath: "/images/book-covers/harry5.jpg",
      description: `There is a door at the end of a silent corridor. And it’s haunting Harry Pottter’s dreams. Why else would he be waking in the middle of the night, screaming in terror?

      Harry has a lot on his mind for this, his fifth year at Hogwarts: a Defense Against the Dark Arts teacher with a personality like poisoned honey; a big surprise on the Gryffindor Quidditch team; and the looming terror of the Ordinary Wizarding Level exams. But all these things pale next to the growing threat of He-Who-Must-Not-Be-Named---a threat that neither the magical government nor the authorities at Hogwarts can stop.
      
      As the grasp of darkness tightens, Harry must discover the true depth and strength of his friends, the importance of boundless loyalty, and the shocking price of unbearable sacrifice.
      
      His fate depends on them all.`
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Half-Blood Prince",
      description: `When Harry Potter and the Half-Blood Prince opens, the war against Voldemort has begun. The Wizarding world has split down the middle, and as the casualties mount, the effects even spill over onto the Muggles. Dumbledore is away from Hogwarts for long periods, and the Order of the Phoenix has suffered grievous losses. And yet, as in all wars, life goes on.

      Harry, Ron, and Hermione, having passed their O.W.L. level exams, start on their specialist N.E.W.T. courses. Sixth-year students learn to Apparate, losing a few eyebrows in the process. Teenagers flirt and fight and fall in love. Harry becomes captain of the Gryffindor Quidditch team, while Draco Malfoy pursues his own dark ends. And classes are as fascinating and confounding as ever, as Harry receives some extraordinary help in Potions from the mysterious Half-Blood Prince.
      
      Most importantly, Dumbledore and Harry work together to uncover the full and complex story of a boy once named Tom Riddle—the boy who became Lord Voldemort. Like Harry, he was the son of one Muggle-born and one Wizarding parent, raised unloved, and a speaker of Parseltongue. But the similarities end there, as the teenaged Riddle became deeply interested in the Dark objects known as Horcruxes: objects in which a wizard can hide part of his soul, if he dares splinter that soul through murder.
      
      Harry must use all the tools at his disposal to draw a final secret out of one of Riddle’s teachers, the sly Potions professor Horace Slughorn. Finally Harry and Dumbledore hold the key to the Dark Lord’s weaknesses... until a shocking reversal exposes Dumbledore’s own vulnerabilities, and casts Harry’s—and Hogwarts’s—future in shadow.`,
      coverPath: "/images/book-covers/harry6.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Deathly Hallows",
      description: `Harry Potter is leaving Privet Drive for the last time. But as he climbs into the sidecar of Hagrid’s motorbike and they take to the skies, he knows Lord Voldemort and the Death Eaters will not be far behind.

      The protective charm that has kept him safe until now is broken. But the Dark Lord is breathing fear into everything he loves. And he knows he can’t keep hiding.
      
      To stop Voldemort, Harry knows he must find the remaining Horcruxes and destroy them.
      
      He will have to face his enemy in one final battle.`,
      coverPath: "/images/book-covers/harry7.jpg"
    }
  ]);

  author = await manager.findOneOrFail(Author, { name: "James S. A. Corey" });
  await manager.insert(Book, [
    {
      authorId: author.id,
      title: "Leviathan Wakes",
      description: `Humanity has colonized the solar system - Mars, the Moon, the Asteroid Belt and beyond - but the stars are still out of our reach.

      Jim Holden is XO of an ice miner making runs from the rings of Saturn to the mining stations of the Belt. When he and his crew stumble upon a derelict ship, the Scopuli, they find themselves in possession of a secret they never wanted. A secret that someone is willing to kill for - and kill on a scale unfathomable to Jim and his crew. War is brewing in the system unless he can find out who left the ship and why.
      
      Detective Miller is looking for a girl. One girl in a system of billions, but her parents have money and money talks. When the trail leads him to the Scopuli and rebel sympathizer Holden, he realizes that this girl may be the key to everything.
      
      Holden and Miller must thread the needle between the Earth government, the Outer Planet revolutionaries, and secretive corporations - and the odds are against them. But out in the Belt, the rules are different, and one small ship can change the fate of the universe.`,
      coverPath: "/images/book-covers/expanse1.jpg"
    },
    {
      authorId: author.id,
      title: "Caliban's War",
      description: `On Ganymede, breadbasket of the outer planets, a Martian marine watches as her platoon is slaughtered by a monstrous supersoldier. On Earth, a high-level politician struggles to prevent interplanetary war from reigniting. And on Venus, an alien protomolecule has overrun the planet, wreaking massive, mysterious changes and threatening to spread out into the solar system.

      In the vast wilderness of space, James Holden and the crew of the Rocinante have been keeping the peace for the Outer Planets Alliance. When they agree to help a scientist search war-torn Ganymede for a missing child, the future of humanity rests on whether a single ship can prevent an alien invasion that may have already begun . . .
      
      Caliban's War is a breakneck science fiction adventure following the critically acclaimed Leviathan Wakes.`,
      coverPath: "/images/book-covers/expanse2.jpg"
    },
    {
      authorId: author.id,
      title: "Abaddon's Gate",
      description: `Abaddon's Gate is the third book in the New York Times bestselling Expanse series.

      For generations, the solar system - Mars, the Moon, the Asteroid Belt - was humanity's great frontier. Until now. The alien artefact working through its program under the clouds of Venus has emerged to build a massive structure outside the orbit of Uranus: a gate that leads into a starless dark.
      
      Jim Holden and the crew of the Rocinante are part of a vast flotilla of scientific and military ships going out to examine the artefact. But behind the scenes, a complex plot is unfolding, with the destruction of Holden at its core. As the emissaries of the human race try to find whether the gate is an opportunity or a threat, the greatest danger is the one they brought with them.`,
      coverPath: "/images/book-covers/expanse3.jpg"
    },
    {
      authorId: author.id,
      title: "Cibola Burn",
      description: `The gates have opened the way to thousands of habitable planets, and the land rush has begun. Settlers stream out from humanity's home planets in a vast, poorly controlled flood, landing on a new world. Among them, the Rocinante, haunted by the vast, posthuman network of the protomolecule as they investigate what destroyed the great intergalactic society that built the gates and the protomolecule.

      But Holden and his crew must also contend with the growing tensions between the settlers and the company which owns the official claim to the planet. Both sides will stop at nothing to defend what's theirs, but soon a terrible disease strikes and only Holden - with help from the ghostly Detective Miller - can find the cure.`,
      coverPath: "/images/book-covers/expanse4.jpg"
    },
    {
      authorId: author.id,
      title: "Nemesis Games",
      description: `The fifth novel in Corey's New York Times bestselling Expanse series--now being produced for television by the SyFy Channel!

      A thousand worlds have opened, and the greatest land rush in human history has begun. As wave after wave of colonists leave, the power structures of the old solar system begin to buckle.
      
      Ships are disappearing without a trace. Private armies are being secretly formed. The sole remaining protomolecule sample is stolen. Terrorist attacks previously considered impossible bring the inner planets to their knees. The sins of the past are returning to exact a terrible price.
      
      And as a new human order is struggling to be born in blood and fire, James Holden and the crew of the Rocinante must struggle to survive and get back to the only home they have left.`,
      coverPath: "/images/book-covers/expanse5.jpg"
    },
    {
      authorId: author.id,
      title: "Babylon's Ashes",
      description: `A revolution brewing for generations has begun in fire. It will end in blood.

      The Free Navy - a violent group of Belters in black-market military ships - has crippled the Earth and begun a campaign of piracy and violence among the outer planets. The colony ships heading for the thousand new worlds on the far side of the alien ring gates are easy prey, and no single navy remains strong enough to protect them.
      
      James Holden and his crew know the strengths and weaknesses of this new force better than anyone. Outnumbered and outgunned, the embattled remnants of the old political powers call on the Rocinante for a desperate mission to reach Medina Station at the heart of the gate network.
      
      But the new alliances are as flawed as the old, and the struggle for power has only just begun. As the chaos grows, an alien mystery deepens. Pirate fleets, mutiny and betrayal may be the least of the Rocinante's problems. And in the uncanny spaces past the ring gates, the choices of a few damaged and desperate people may determine the fate of more than just humanity.`,
      coverPath: "/images/book-covers/expanse6.jpg"
    },
    {
      authorId: author.id,
      title: "Persepolis Rising",
      description: `In the thousand-sun network of humanity's expansion, new colony worlds are struggling to find their way. Every new planet lives on a knife edge between collapse and wonder, and the crew of the aging gunship Rocinante have their hands more than full keeping the fragile peace.

      In the vast space between Earth and Jupiter, the inner planets and belt have formed a tentative and uncertain alliance still haunted by a history of wars and prejudices. On the lost colony world of Laconia, a hidden enemy has a new vision for all of humanity and the power to enforce it.
      
      New technologies clash with old as the history of human conflict returns to its ancient patterns of war and subjugation. But human nature is not the only enemy, and the forces being unleashed have their own price. A price that will change the shape of humanity -- and of the Rocinante -- unexpectedly and forever...`,
      coverPath: "/images/book-covers/expanse7.jpg"
    },
    {
      authorId: author.id,
      title: "Tiamat's Wrath",
      description: `Thirteen hundred gates have opened to solar systems around the galaxy. But as humanity builds its interstellar empire in the alien ruins, the mysteries and threats grow deeper.

      In the dead systems where gates lead to stranger things than alien planets, Elvi Okoye begins a desperate search to discover the nature of a genocide that happened before the first human beings existed, and to find weapons to fight a war against forces at the edge of the imaginable. But the price of that knowledge may be higher than she can pay.
      
      At the heart of the empire, Teresa Duarte prepares to take on the burden of her father's godlike ambition. The sociopathic scientist Paolo Cortázar and the Mephistophelian prisoner James Holden are only two of the dangers in a palace thick with intrigue, but Teresa has a mind of her own and secrets even her father the emperor doesn't guess.
      
      And throughout the wide human empire, the scattered crew of the Rocinante fights a brave rear-guard action against Duarte's authoritarian regime. Memory of the old order falls away, and a future under Laconia's eternal rule -- and with it, a battle that humanity can only lose - seems more and more certain. Because against the terrors that lie between worlds, courage and ambition will not be enough...`,
      coverPath: "/images/book-covers/expanse8.jpg"
    }
  ]);

  author = await manager.findOneOrFail(Author, { name: "Andrzej Sapkowski" });
  await manager.insert(Book, [
    {
      authorId: author.id,
      title: "Blood of Elves",
      description: `For more than a hundred years, humans, dwarves, gnomes and elves lived together in relative peace. But times have changed, the uneasy peace is over and now the races are fighting once again - killing their own kind and each other.

      Into this tumultuous time is born a child of prophecy, Ciri, surviving heiress of a bloody revolution, whose strange abilities can change the world - for good, or for evil...
      
      As the threat of war hangs over the land, Geralt the Witcher must protect Ciri from those who are hunting the child for her destructive power.
      
      But this time, Geralt may have met his match.`,
      coverPath: "/images/book-covers/witcher1.jpg"
    },
    {
      authorId: author.id,
      title: "Time of contempt",
      description: `The kings and armies are manoeuvring for position, each fearing invasion from across the river, each fearing their neighbours more. Intrigue, dissent and rebellion fester on all sides.

      After decades of oppression, the elves and other races are fighting each other and attacking the humans - and with growing numbers preparing for battle, the threat of all-out war looms ever greater.
      
      Against this backdrop of fear, Geralt and Yennefer must protect Ciri, the orphaned heir who is sought by all sides. For the child of prophecy has the power to change the world - if she lives to use it.`,
      coverPath: "/images/book-covers/witcher2.jpg"
    },
    {
      authorId: author.id,
      title: "Baptism of fire",
      description: `The Wizards Guild has been shattered by a coup and, in the uproar, Geralt was seriously injured. The Witcher is supposed to be a guardian of the innocent, a protector of those in need, a defender against powerful and dangerous monsters that prey on men in dark times.

      But now that dark times have fallen upon the world, Geralt is helpless until he has recovered from his injuries.
      
      While war rages across all of the lands, the future of magic is under threat and those sorcerers who survive are determined to protect it. It's an impossible situation in which to find one girl - Ciri, the heiress to the throne of Cintra, has vanished - until a rumour places her in the Niflgaard court, preparing to marry the Emperor.
      
      Injured or not, Geralt has a rescue mission on his hands.`,
      coverPath: "/images/book-covers/witcher3.jpg"
    },
    {
      authorId: author.id,
      title: "The tower of the swallow",
      description: `The world has fallen into war. Ciri, the child of prophecy, has vanished. Hunted by friends and foes alike, she has taken on the guise of a petty bandit and lives free for the first time in her life.

      But the net around her is closing. Geralt, the Witcher, has assembled a group of allies determined to rescue her. Both sides of the war have sent brutal mercenaries to hunt her down. Her crimes have made her famous.
      
      There is only one place left to run. The tower of the swallow is waiting...`,
      coverPath: "/images/book-covers/witcher4.jpg"
    },
    {
      authorId: author.id,
      title: "The lady of the lake",
      description: `After walking through a portal in the Tower of the Swallow, thus narrowly escaping death, the Witcher girl, Ciri, finds herself in a completely different world... a world of the Elves. She is trapped with no way out. Time does not seem to exist and there are no obvious borders or portals to cross back into her home world.

      But this is Ciri, the child of prophecy, and she will not be defeated. She knows she must escape to finally rejoin the Witcher, Geralt, and his companions - and also to try to conquer her worst nightmare. Leo Bonhart, the man who chased, wounded and tortured Ciri, is still on her trail.
      
      And the world is still at war.`,
      coverPath: "/images/book-covers/witcher5.jpg"
    }
  ]);
}

async function loadUsers() {
  const { manager } = getConnection();

  const users = manager.create(User, [
    {
      name: "Alice",
      email: "alice@example.com",
      info: `Food scholar. Incurable tv fanatic. Reader. Typical zombie buff. Gamer. Lifelong creator. Certified organizer.`,

      avatar: {
        imagePath: "/images/avatars/w13.png",
        color: "yellow"
      }
    },
    {
      name: "Bob",
      email: "bob@example.com",
      info: `Twitter fan. Social media expert. Hardcore explorer. Communicator. Amateur coffee lover.`,
      avatar: {
        imagePath: "/images/avatars/m10.png",
        color: "green"
      }
    },
    {
      name: "Celine",
      email: "celine@example.com",
      info: `Wannabe pop culture specialist. Tv scholar. Lifelong social media practitioner. Music geek. Falls down a lot.`,
      avatar: {
        imagePath: "/images/avatars/w2.png",
        color: "red"
      }
    },
    {
      name: "Dan",
      email: "dan@example.com",
      info: `Professional problem solver. Devoted explorer. Gamer. Unapologetic bacon guru.`,
      avatar: {
        imagePath: "/images/avatars/m25.png",
        color: "blue"
      }
    }
  ]);

  await manager.save(users);
}

async function loadBookCopies() {
  const { manager } = getConnection();

  const userBob = await manager.findOneOrFail(User, { name: "Bob" });
  const userAlice = await manager.findOneOrFail(User, { name: "Alice" });

  let book = await manager.findOneOrFail(Book, { title: "Blood of Elves" });
  const borrower = await manager.findOneOrFail(User, { name: "Alice" });

  await manager.insert(BookCopy, {
    ownerId: userBob.id,
    bookId: book.id,
    borrowerId: borrower.id
  });

  book = await manager.findOneOrFail(Book, { title: "The lady of the lake" });
  await manager.insert(BookCopy, {
    ownerId: userBob.id,
    bookId: book.id,
    borrowerId: undefined
  });

  book = await manager.findOneOrFail(Book, {
    title: "The tower of the swallow"
  });
  await manager.insert(BookCopy, {
    ownerId: userAlice.id,
    bookId: book.id,
    borrowerId: userBob.id
  });
}

export const loadFixtures = async (): Promise<void> => {
  await loadAuthors();
  await loadBooks();
  await loadUsers();
  await loadBookCopies();
};
