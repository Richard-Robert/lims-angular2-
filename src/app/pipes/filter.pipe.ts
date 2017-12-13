import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
var filtered = items.filter(
  it => {
      return it.title.toLowerCase().includes(searchText)||it.author.toLowerCase().includes(searchText);
    });
    if(filtered.length > 0)
      return filtered;
    else
    alert("Result not found");
   }

}
