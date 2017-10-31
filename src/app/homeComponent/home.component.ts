import {Component} from '@angular/core';


@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./../../assets/css/global.css', './home.component.css']
})
export class HomeComponent {
  // title= 'The Tethered Mage';
bookList = [
  {
    title: 'THE TETHERED MAGE',
    genres: ['Science Fiction', 'Fantasy'],
    author: 'Melissa Caruso',
    imgSrc: '/assets/images/books/The_Tethered_Mage.jpg',
    /* tslint:disable:max-line-length */
    shortSummary: 'At first glance, it would be easy to write off The Tethered Mage as another coming-of-age novel with an interesting magic system. To do so would mean missing a breathtaking book. Equal parts fantasy and political intrigue, The Tethered Mage pulls readers relentlessly through labyrinthine turns of conspiracy, adventure and romance....',
    ISBN: '9780316466875',
    Published: '10/24/2017',
    Prologue: 'At first glance, it would be easy to write off The Tethered Mage as another coming-of-age novel with an interesting magic system. To do so would mean missing a breathtaking book. Equal parts fantasy and political intrigue, The Tethered Mage pulls readers relentlessly through labyrinthine turns of conspiracy, adventure and romance.' +
  'The Raverran Empire’s complete control over magic users has allowed it to expand through threat of violence. Warlocks, referred to as Falcons, are controlled by conscription into the Raverran army at a young age. Falconers have complete control over when Falcons can use their powers, which are only unleashed for the good of the Empire. But the balance of power within Raverra is a tenuous one. When Amalia Cornaro, heir to one of the most powerful houses in the realm, captures a powerful fire warlock who threatens to burn the city of Raverra, she endangers that balance.Amalia is pulled into the life of a Falconer, a role previously forbidden to her because of her noble blood. Her Falcon, the street-hardened Zaira, has avoided conscription long enough to recognize that “the good of the Empire” and her own interests do not necessarily overlap. As Zaira and Amalia come to terms with their new relationship, they are pulled into a conspiracy that puts the Empire—and everyone they love—in danger.' +
  'While most of her characters are young adults, Caruso avoids some of the pitfalls of writing about that age group. Her characters are nuanced and thoughtful, driven by duty to country and family. That isn’t to say that Caruso neglects relationships within her novel. Rather, she doesn’t limit herself to romance or allow it to absorb Amalia or Zaira, and it’s refreshing to have those entanglements take a back seat in service of the plot. Instead, Caruso’s characters’ non-romantic relationships drive the action, pulling each away from duty and forcing them to make difficult decisions.' +
  'Although the political machinations surrounding the young women are complex, the story never drags. Instead, it sends the reader digging into each sentence to find the key that will make the conspiracy surrounding Amalia and Zaira’s adventure fall into place. This first entry into the Swords and Fire trilogy is worth every moment and every page, and it should make anyone paying attention excited about what Caruso will write next.'

  }
];
}
