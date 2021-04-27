# Lab5
Repozytorium zawiera wybrane fragmenty aplikacji sterującej dronem wykorzystującej sensory urządzenia mobilnego.

Laboratorium miało na celu zapoznanie się z obsługą gestów użytkownika. W przedstawionym przypadku gestami użytkownaika były odchylenia smartfonu i pozwalały na sterowanie wartością azymutu, pochylenia i przechylenia drona.


## Zrzuty ekranu

Import bibliotek:

![import](images/import.png)

Ustalenie początkowych wartości przechylenia, pochylenia i azymutu:

![start](images/start.png)

Ustalenie odchyleń smartfonu od początkowych wartości:

![values](images/values.png)

Końcowa obróbka danych mająca na celu "łagodniejsze" startowanie drona i wysłanie ich jako polecenia sterujące:

![send](images/send.png)

Lot drona przy wykorzystaniu sensorów - widać w nim brak precyzji lotu:

![simulator1](images/simulator1.png)

Poprawka niwelująca odczytywanie niewielkich ruchów smartfonu pozwalająca na łatwiejsze sterowanie:

![fix](images/fix.png)

Lot po wprowadzeniu poprawki:

![simulator2](images/simulator2.png)

