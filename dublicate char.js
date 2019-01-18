var str = "sriram";
str = str.split('');
str.sort();

for (let i=0; i<str.length; i++)
{
    if(str[i] == str[i+1])
    {
        console.log("Repeated letter: "+ str[i]);
        break;
    }
}
