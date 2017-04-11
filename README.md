# Array
Library which adds to the array object query capabilities LINQ-like.

When loaded add to the javascript Array object the methods:

- **remove(item[, comparator]):void**: removes an item from the array
- **addUnique(item[,comparator]):bool**: add an item to the arry if not present
- **contains(item[, comparator]):bool**: true if the array contains the element
- **selectOne(item[, comparator]):object**: select the item element if matches the comparison
- **where(selector):array**: selects a portion of the array
- **count(selector):int**: counts the element in a selection
- **first(selector):object**: reuturn the first matching element
- **last(selector):object**: returns the last mathcing element
- **select(transformer):object**: projects a protion of the array object in another array
- **next(item[, comparator, rotate]):object**: obtains the element succeding to the provided one, optionally rotating in the array.
- **prev(item[, comparator, rotate]):object**:obtains the element preceding to the provided one, optionally rotating in the array.
- **Union(list[, comparator]):array**: returs a union of the current array with the one provided.
- **Except(list[, comparator]):array**: return the differnece between the two array.
- **Intersect(list[, comparator]):array**: return the intersection between the two array.
- **groupBy(comparator, namer):array**: returns an array of groups. Every group has the attribute _name_ set by the namer funcion and the attribute _items_ containing the grouped elements.
- **orderBy(comparator):array**: orders the array
- **distinct([comparator]):self**: gets an array without duplicates.
- **any(selector):bool**: returns true if at least one element matches the condition.
- **selectMany(merger):array**: returns an array fusing the arry returned by the _merger_ function
- **insertOrdered(item[, comparator]):self**: insert an element keeping the order in the array

### Function signatures

**comparator(a,b)** 

must return true if the a==b. Default control is a==b

**selector(p)**

must return true if the condition evaluated on the element is matched

**transformer(p)**

returns an object obtained from the element

**merger(p)**

must return an array, obtained from the element

#Example

<pre>

var test=[
	{
		name:"one",
		values:[1,11,111]
	},
	{
		name:"two",
		values:[2,22,222]
	},
	{
		name:"three",
		values:[3,33,333]
	}
];

</pre>

<pre>
test.selectMany(function(p){ return p.values}); //[1,11,111,2,22,222,3,33,333]
</pre>
<pre>
test.selectMany(function(p){ return p.values}).where(function(p){return p<10}); //[1,2,3]
</pre>

<pre>
test.groupBy(function(a,b){ return a.name[0]==b.name[0];},funcion(p){return p.items.first().name[0];})
/*	result
	[
		{
			name:"o", 
			items:[{
				name:"one",
				values:[1,11,111]
			}]
		},{
			name:"t", 
			items:[
			{
				name:"two",
				values:[2,22,222]
			},
			{
				name:"three",
				values:[3,33,333]
			}]
		}
	]
*/
</pre>
